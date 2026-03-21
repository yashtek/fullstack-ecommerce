import { Context } from "hono";
import { loginSchema, signupSchema } from "../dto/auth.dto";
import { loginService, logoutService, signupService,RefreshAccessToeknService } from "../service/auth.service";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { db } from "../db";
import jwt from "jsonwebtoken";

export const loginController = async (c: Context) => {
  try {
    const body = await  c.req.json();
    const validate = await loginSchema.parse(body);

    const ipAddress =
      c.req.header("x-forwarded-for")?.split(",")[0] ||
      c.req.header("x-real-ip") ||
      "unknown";
    const deviceName = c.req.header("user-agent") || "unknown";
    const deviceId = c.req.header("x-device-id") || crypto.randomUUID();
    const result = await loginService(validate, {
      ipAddress,
      deviceId,
      deviceName,
    });

    setCookie(c, "accessToken", result.accesstoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 15, // 15 min
    });

    setCookie(c, "refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return c.json({
      success: true,
      user: result.data,
    //   accessToken:result.accesstoken,
    //   refreshToken:result.refreshToken
      
    });
  } catch (err) {
    if (err instanceof Error) {
      return c.json({ success: false, message: err.message }, 400);
    }
    return c.json({ success: false, message: "Something went wrong" }, 500);
  }
};

export const signupController = async (c: Context) => {
  try {
    const body = await c.req.json();

    const validate = await signupSchema.parse(body);
    const result = await signupService(validate);

    return c.json(
      {
        success: true,
        message: "User Created successfully",
        data: result.data,
      },
      201
    );
  } catch (err) {
    if (err instanceof Error) {
      return c.json({ success: false, message: err.message }, 400);
    }
    return c.json({ success: false, message: "Something went wrong" }, 500);
  }
};

export const logoutController = async(c:Context) => {
    try{
        const refreshToken = getCookie(c,"refreshToken");

        if(!refreshToken){
            return c.json({
                success:false,message:"No refresh token found"
            },401)
        }

        await logoutService(refreshToken);

        deleteCookie(c,"accessToken");
        deleteCookie(c,"refreshToken");

      return c.json({
      success: true,
      message: "Logged out successfully",
    });




        


    }catch(err){
        if (err instanceof Error) {
      return c.json({ success: false, message: err.message }, 400);
    }
    return c.json({ success: false, message: "Something went wrong" }, 500);
    }
};

export const RefershAccessTokenController = async (c:Context) => {
    try{
        const refreshToken = getCookie(c,"refreshToken");
if (!refreshToken) {
      return c.json(
        { success: false, message: "No refresh token found" },
        401
      );
    }

    const result = await RefreshAccessToeknService(refreshToken);

    setCookie(c, "accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 15, 
    });

    return c.json({
      success: true,
      message: "accessToken updated successfully ",
    
    });


    }catch(err){
        if (err instanceof Error) {
      return c.json({ success: false, message: err.message }, 400);
    }
    return c.json({ success: false, message: "Something went wrong" }, 500);
    }
};

export const getUserController = async(c:Context) => {
    try{
        const token = getCookie(c,"accessToken");

        if(!token){
            return c.json({ message: "Unauthorized" }, 401)
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {id:string};

        const userData = await db.select().from(users).where(eq(users.id,decoded.id));
        if (!userData.length) {
      return c.json({ message: "User not found" }, 404);
    }
    const user = userData[0];

    return c.json({
      user: {
        email: user.email,
        role: user.role,
      },
    });

        
    }catch(err){
        if (err instanceof Error) {
      return c.json({ success: false, message: err.message }, 400);
    }
    return c.json({ success: false, message: "Something went wrong" }, 500);
    }

};
