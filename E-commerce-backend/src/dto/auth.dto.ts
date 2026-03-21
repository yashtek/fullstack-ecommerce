import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).max(255).trim(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.string().email().trim(),
  username: z.string().min(4).max(50).trim().regex(/^[a-zA-Z0-9_]+$/,"Only letters, numbers,underscore allowed"),
  password: z.string().min(8).max(255).trim().regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    ),
    role: z.enum(["admin", "user"]).default("user"),
});
export type SignupInput = z.infer<typeof signupSchema>;
