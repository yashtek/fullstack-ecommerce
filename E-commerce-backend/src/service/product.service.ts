import { ProductInput, productSchema } from "../dto/product.dto";
import { db } from "../db";
import { products, orders } from "../db/schema";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import {
  deleteImage,
  deleteMultipleImages,
  uploadImage,
} from "../../utils/cloudUpload";
import { Resend } from "resend";
import Razorpay from "razorpay";
import crypto from "crypto";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_Test_API_Key,
  key_secret: process.env.RAZORPAY_Test_Key_Secret,
});
const resend = new Resend(process.env.RESEND_KEY);

export const AddandUpadteProduc = async (
  body: ProductInput,
  mainFile?: File,
  galleryFiles?: File[],
) => {
  const parsed = productSchema.parse(body);

  const { id, price, productName, stock, category, about } = parsed;

  if (stock <= 0) throw new Error("Stock must be greater then 0");
  if (price <= 0) throw new Error("Price must be greate then 0");
  const cat = [
    "Electronics",
    "Clothing",
    "Toys",
    "HomeDecor",
    "Kitchen",
    "Bathroom",
    "Stationery",
    "Food",
  ];
  if (!cat.includes(category)) throw new Error("Choose valid category");

  if (galleryFiles && galleryFiles.length > 5) {
    throw new Error("Maximum 5 Product Image are allowed");
  }
  // update Flow

  if (id) {
    const existing = await db.query.products.findFirst({
      where: eq(products.id, id),
    });

    if (!existing) throw new Error("No Product Found");

    let mainImage = existing.mainImage;
    let productImages = existing.productImages || [];

    if (mainFile) {
      const upload = await uploadImage(mainFile, id);

      if (existing.mainImage?.public_id) {
        await deleteImage(existing.mainImage.public_id);
      }

      mainImage = upload;
    }

    if (galleryFiles && galleryFiles.length > 0) {
      if (existing.productImages?.length) {
        await deleteMultipleImages(existing.productImages);
      }
      const uploadedImage = await Promise.all(
        galleryFiles.map((file) => uploadImage(file, id)),
      );

      productImages = uploadedImage;
    }
    console.log(about);
    const [updated] = await db
      .update(products)
      .set({
        productName,
        price: price.toString(),
        stock,
        category,
        about,
        mainImage,
        productImages,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return {
      success: true,
      message: "Product update successfully",
      data: updated,
    };
  }

  //   create flow

  if (!mainFile) {
    throw new Error("Main Image is required");
  }
  const mainImage = await uploadImage(mainFile);

  let productImages: { url: string; public_id: string }[] = [];

  if (galleryFiles && galleryFiles.length > 0) {
    productImages = await Promise.all(galleryFiles.map((e) => uploadImage(e)));
  }

  const [created] = await db
    .insert(products)
    .values({
      productName,
      price: price.toString(),
      stock,
      productImages,
      mainImage,
      about,
      category,
      isLive: false,
      createdAt: new Date(),
    })
    .returning();

  return {
    success: true,
    message: "product created Successfully",
    data: created,
  };
};

export const getALlProductService = async ({
  page = 1,
  limit = 10,
  search = "",
  category,
}: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}) => {
  const offset = (page - 1) * limit;

  const filters = [];

  if (search) {
    filters.push(ilike(products.productName, `%${search}%`));
  }

  if (category) {
    filters.push(eq(products.category, category));
  }

  const data = await db.query.products.findMany({
    where: filters.length ? and(...filters) : undefined,
    limit,
    offset,
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });

  // total count (important for frontend pagination)
  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(filters.length ? and(...filters) : undefined);

  return {
    data,
    pagination: {
      page,
      limit,
      total: total[0]?.count || 0,
      totalPages: Math.ceil((total[0]?.count || 0) / limit),
    },
  };
};

export const getProductById = async ({ id }: { id: string }) => {
  const data = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  if (!data) {
    throw new Error("Product Not found");
  }

  return {
    success: true,
    data,
  };
};

export const deleteProductService = async (id: string) => {
  const existing = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  if (!existing) {
    throw new Error("Product Not found");
  }

  if (existing.mainImage?.public_id) {
    await deleteImage(existing.mainImage?.public_id);
  }
  if (existing.productImages?.length) {
    await deleteMultipleImages(existing.productImages);
  }

  await db.delete(products).where(eq(products.id, id));

  return {
    message: "Product deleted Successfully",
  };
};

export const ToggleLiveService = async ({
  id,
  isLive,
}: {
  isLive: boolean;
  id: string;
}) => {
  const existing = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  if (!existing) {
    throw new Error("Product Not found");
  }

  const [updated] = await db
    .update(products)
    .set({
      isLive,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id))
    .returning();

  if (!updated) throw new Error("Issue while Updating");

  return {
    success: true,
    data: updated,
  };
};

export const razorPayOrder = async ({
  productId,
  name,
  phone,
  address,
  city,
  pincode,
  quantity,
}: {
  phone: string;
  name: string;
  productId: string;
  address: string;
  city: string;
  pincode: number;
  quantity: number;
}) => {
  if (quantity <= 0) {
    throw new Error("Invalid quantity");
  }

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const amount = Number(product.price) * quantity;

  const rpOrder = await instance.orders.create({
    amount: Math.round(amount * 100), // paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  const [order] = await db
    .insert(orders)
    .values({
      productId,
      phone,
      name,
      address,
      city,
      pincode,
      quantity,
      amount: amount.toString(),

      razorpayOrderId: rpOrder.id,
      status: "pending",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    })
    .returning();

  return {
    orderId: order.id,
    razorpayOrderId: rpOrder.id,
    amount: rpOrder.amount, 
    currency: rpOrder.currency,
  };
};

export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_Test_Key_Secret!)
    .update(body.toString())
    .digest("hex");

  // 2. Verify
  if (expectedSignature !== razorpay_signature) {
    throw new Error("Invalid payment signature");
  }
  await db
    .update(orders)
    .set({
      status: "paid",
      razorpayPaymentId: razorpay_payment_id,
    })
    .where(eq(orders.razorpayOrderId, razorpay_order_id));

  const order = await db.query.orders.findFirst({
    where: eq(orders.razorpayOrderId, razorpay_order_id),
    with: {
      product: true,
    },
  });
  if (!order) {
    throw new Error("Order not found");
  }

  const productName = order.product.productName;
  const totalAmount = Number(order.product.price) * order.quantity;
  const quantity = order.quantity;
  const customerName = order.name;

  const emailHtml = `
    <h2>Payment Successful 🎉</h2>
    <p>Hi ${customerName},</p>
    <p><strong>Product:</strong> ${productName}</p>
    <p><strong>Quantity:</strong> ${quantity}</p>
    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
    <p><strong>Status:</strong> Paid</p>
   
  `;
  console.log("Reach to email");
  try {
    const { data, error } = await resend.emails.send({
      from: "Ecommerce <onboarding@resend.dev>",
      to: ["yashsharma280803@gmail.com"],
      subject: "Payment Confirmed - Order Receipt",
      html: emailHtml,
    });

    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent successfully:", data);
    }
  } catch (emailError) {
    console.error("Failed to send email:", emailError);
  }

  return {
    success: true,
  };
};
