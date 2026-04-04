import { Context } from "hono";
import { productSchema } from "../dto/product.dto";
import {
  AddandUpadteProduc,
  deleteProductService,
  getALlProductService,
  getProductById,
  razorPayOrder,
  ToggleLiveService,
  verifyPayment,
} from "../service/product.service";
import { success } from "zod";

export const addOrUpdateController = async (c: Context) => {
  try {
    const body = await c.req.formData();

    const mainFile = body.get("mainImage") as File | null;
    const galleryFiles = body.getAll("productImages") as File[];

    const data = {
      id: (body.get("id") as string) || undefined,
      productName: body.get("productName") as string,
      price: Number(body.get("price")),
      stock: Number(body.get("stock")),
      about: (body.get("about") as string) || undefined,
      category: body.get("category") as
        | "Electronics"
        | "Clothing"
        | "Toys"
        | "HomeDecor"
        | "Kitchen"
        | "Bathroom"
        | "Stationery"
        | "Food",
      isLive: body.get("isLive") === "true" ? true : false,
    };

    const result = await AddandUpadteProduc(
      data,
      mainFile || undefined,
      galleryFiles.length ? galleryFiles : undefined,
    );

    return c.json(result, 200);
  } catch (error: any) {
    console.log(error);
    return c.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      500,
    );
  }
};

export const getAllProductController = async (c: Context) => {
  try {
    const page = Number(c.req.query("page")) || 1;
    const limit = Number(c.req.query("limit")) || 10;
    const search = c.req.query("search") || "";
    const category = c.req.query("category") || "";

    console.log("reach");
    const data = await getALlProductService({
      page,
      limit,
      search,
      category,
    });

    return c.json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    console.error(error.message);
    return c.json({
      success: false,
      message: error.message || "Unable to get product",
    });
  }
};

export const deleteProductController = async (c: Context) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json({ success: false, message: "Product ID is required" }, 400);
    }
    console.log("error");
    await deleteProductService(id);

    return c.json({
      success: true,
    });
  } catch (error: any) {
    console.error(error.message);
    return c.json(
      {
        success: false,
        error: error.message || "Unable to delete",
      },
      500,
    );
  }
};

export const getProductByIdController = async (c: Context) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json({ success: false, message: "Product ID is required" }, 400);
    }
    const data = await getProductById({ id });
    return c.json(data, 200);
  } catch (err: any) {
    console.error(err.message);
    return c.json(
      {
        success: false,
        error: err.message || "Internal server error",
      },
      500,
    );
  }
};

export const updateToggle = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { isLive } = body;

    if (!id || isLive === undefined) {
      return c.json(
        { success: false, message: "Product ID and isLive status required" },
        400,
      );
    }

    const data = await ToggleLiveService({ isLive, id });
    return c.json(data, 200);
  } catch (err: any) {
    console.error(err.message);
    return c.json(
      {
        success: false,
        error: err.message || "Internal server error",
      },
      500,
    );
  }
};

export const razorpayOrderController = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { productId, address, city, pincode, quantity, amount,phone,name } = body;
    if (!productId || !address || !city || !pincode || !quantity || !name || !phone) {
      return c.json(
        { success: false, message: "All fields are required" },
        400,
      );
    }
    const data = await razorPayOrder(body);
    return c.json(data, 200);
  } catch (err: any) {
    console.error(err.message);
    return c.json(
      {
        success: false,
        error: err.message || "Internal server error",
      },
      500,
    );
  }
};

export const verifyRazorpayOrderController = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return c.json(
        { success: false, message: "All fields are required" },
        400,
      );
    }
    const verify = await verifyPayment(body);
    return c.json(verify, 200);
  } catch (err: any) {
    console.error(err.message);
    return c.json(
      {
        success: false,
        error: err.message || "Internal server error",
      },
      500,
    );
  }
};
