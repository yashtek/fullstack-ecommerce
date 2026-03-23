import { ProductInput, productSchema } from "../dto/product.dto";
import { db } from "../db";
import { products } from "../db/schema";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import {
  deleteImage,
  deleteMultipleImages,
  uploadImage,
} from "../../utils/cloudUpload";


export const AddandUpadteProduc = async (
  body: ProductInput,
  mainFile?: File,
  galleryFiles?: File[],
) => {
  const parsed = productSchema.parse(body);

  const { id, price, productName, stock, category,about } = parsed;

  if (stock <= 0) throw new Error("Stock must be greater then 0");
  if (price <= 0) throw new Error("Price must be greate then 0");
  const cat = ["Electronics",
  "Clothing",
  "Toys",
  "HomeDecor",
  "Kitchen",
  "Bathroom",
  "Stationery",
  "Food"]
  if(!cat.includes(category)) throw new Error("Choose valid category");

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
    let productImages  = existing.productImages || [];

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

      productImages  = uploadedImage;
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
      .where(eq(products.id, id)).returning();

    return {
      success: true,
      message: "Product update successfully",
      data:updated,
    };
  }

//   create flow

if(!mainFile){
    throw new Error("Main Image is required");

}
const mainImage = await uploadImage(mainFile);

    let productImages:{url:string;public_id:string}[]=[];

    if(galleryFiles && galleryFiles.length >0){
        productImages = await Promise.all(
            galleryFiles.map((e)=>uploadImage(e))
        );
    }

    const [created] = await  db.insert(products).values({
        productName,
        price:price.toString(),
        stock,
        productImages,
        mainImage,
        about,
        category,
        isLive:false,
        createdAt:new Date(),
    }).returning();

    return {
        success:true,
        message:"product created Successfully",
        data:created,
    };

};

import { ilike, and, eq } from "drizzle-orm";

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



export const deleteProductService = async(id:string) => {
    const existing = await db.query.products.findFirst({
  where: eq(products.id, id),
});
    if(!existing){
        throw new Error("Product Not found");
    }

    if(existing.mainImage?.public_id){
        await deleteImage(existing.mainImage?.public_id);
    }
    if(existing.productImages?.length){
        await deleteMultipleImages(existing.productImages);
    }

    await db.delete(products).where(eq(products.id, id));

    return {
        message:"Product deleted Successfully"
    }

};

export const ToggleLive = () => {};
