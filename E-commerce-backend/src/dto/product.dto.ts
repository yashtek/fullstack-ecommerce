import { z } from "zod";

export const productSchema = z.object({
  id: z.coerce.string().optional(),
  productName: z.string().min(10).max(255),
  price: z.coerce.number().positive(),
  about: z.string().min(10).max(255).trim().optional(),
  mainImage: z.object({
    url: z.string().url(),
    public_id: z.string(),
  }).optional(),
  productImages: z
    .array(
      z.object({
        url: z.string().url(),
        public_id: z.string(),
      }),
    )
    .default([])
    .optional(),
  isLive: z.boolean(),
  stock: z.number().min(0).default(0),
  category: z.enum([
    "Electronics",
    "Clothing",
    "Toys",
    "HomeDecor",
    "Kitchen",
    "Bathroom",
    "Stationery",
    "Food",
  ]),
});
export type ProductInput = z.infer<typeof productSchema>;
