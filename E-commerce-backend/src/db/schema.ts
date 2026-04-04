import {
  boolean,
  integer,
  json,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("user_role", ["admin", "user"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").default("user").notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  refreshToken: varchar("refresh_token", { length: 1000 }).notNull(),
  ipAddress: varchar("ip_address", { length: 255 }),
  deviceId: varchar("device_id", { length: 255 }),
  deviceName: varchar("device_name", { length: 255 }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoryEnum = pgEnum("category", [
  "Electronics",
  "Clothing",
  "Toys",
  "HomeDecor",
  "Kitchen",
  "Bathroom",
  "Stationery",
  "Food",
]);
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  productName: varchar("name", { length: 255 }).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  about: varchar("about", { length: 255 }).default(""),
  mainImage: json("main_image")
    .$type<{ url: string; public_id: string }>()
    .default({ url: "", public_id: "" }),
  productImages: json("product_images")
    .$type<{ url: string; public_id: string }[]>()
    .default([]),
  isLive: boolean("is_live").default(false).notNull(),
  stock: integer("stock").default(0).notNull(),
  category: categoryEnum("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),

  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  pincode: integer("pincode").notNull(),

  quantity: integer("qty").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),

  status: varchar("status", { length: 20 }).default("pending").notNull(),

  razorpayPaymentId: varchar("payment_id", { length: 255 }),
  razorpayOrderId: varchar("order_id", { length: 255 }),

  expiresAt: timestamp("expires_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const ordersRelations = relations(orders, ({ one }) => ({
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
}));


export const productsRelations = relations(products, ({ many }) => ({
  orders: many(orders),
}));
