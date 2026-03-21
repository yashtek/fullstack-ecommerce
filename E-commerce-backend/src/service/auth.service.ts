import { eq } from "drizzle-orm";
import { sessions, users } from "../db/schema";
import { LoginInput, SignupInput } from "../dto/auth.dto";
import { db } from "../db";
import * as jwt from "jsonwebtoken";

import { randomBytes } from "crypto";

export const loginService = async (
  body: LoginInput,
  meta: { ipAddress?: string; deviceName?: string; deviceId?: string },
) => {
  const { email, password } = body;

  const userExist = await db.select().from(users).where(eq(users.email, email));
  if (!userExist.length) {
    throw new Error("Invalid Email & Password");
  }
  const existingUser = userExist[0];

  const isPassowrdValid = await Bun.password.verify(
    password,
    existingUser.password,
  );

  if (!isPassowrdValid) {
    throw new Error("Invalid Email & Password");
  }
  if (!existingUser.isActive) {
    throw new Error("Account not activated");
  }

  const accesstoken = jwt.sign(
    { id: existingUser.id, role: existingUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" },
  );
  const refreshToken = randomBytes(64).toString("hex");

  await db.insert(sessions).values({
    userId: existingUser.id,
    refreshToken, // FIXED
    ipAddress: meta?.ipAddress,
    deviceName: meta?.deviceName,
    deviceId: meta?.deviceId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accesstoken,
    refreshToken,
    data: {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
  };
};
export const signupService = async (body: SignupInput) => {
  const { email, username, password, role } = body;

  const hashedpassword = await Bun.password.hash(password);

  const result = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashedpassword,
      role,
      isActive: true,
      createdAt: new Date(Date.now()),
    })
    .returning();

  const user = result[0];

  return {
    data: {
      id: user.id,
      name: user.username,
    },
  };
};

export const logoutService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  const deleted = await db
    .delete(sessions)
    .where(eq(sessions.refreshToken, refreshToken))
    .returning();

  if (!deleted.length) {
    throw new Error("Invalid Session");
  }

  return {
    message: "logout successfully",
  };
};

export const RefreshAccessToeknService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Referesh token required");
  }

  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.refreshToken, refreshToken));

  if (!session.length) {
    throw new Error("Invalid session");
  }

  const existingUser = session[0];

  if (new Date(existingUser.expiresAt) < new Date()) {
    await db.delete(sessions).where(eq(sessions.refreshToken, refreshToken));

    throw new Error("Refresh token expired");
  }

  const userData = await db
    .select()
    .from(users)
    .where(eq(users.id, existingUser.userId));

  if (!userData) {
    throw new Error("user not found");
  }

  const user = userData[0];

  if (!user.isActive) {
    throw new Error("Account not active");
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" },
  );

  return {
    accessToken,
  };
};
