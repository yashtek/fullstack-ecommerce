import { z } from "zod";

export const productSchema = z.object({
  id: z.coerce.string().optional(),
  productName: z.string().min(10).max(255),
  price: z.coerce.number().positive(),
  about: z.string().min(10).max(255).trim().optional(),
  mainImage: z
    .object({
      url: z.string().url(),
      public_id: z.string(),
    })
    .optional(),
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

export const orderSchema = z.object({
  productId: z.string().uuid(),

  address: z.string().min(5).max(255),
  city: z.string().min(2).max(50),
  pincode: z.number().int().min(100000).max(999999),

  quantity: z.number().int().min(1),
  amount: z.number().positive(),

  status: z.enum(["pending", "paid", "failed", "cancelled"]).optional(),

  razorpayPaymentId: z.string().max(255).optional(),
  razorpayOrderId: z.string().max(255).optional(),

  expiresAt: z.coerce.date().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>
