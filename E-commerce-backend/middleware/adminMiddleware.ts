import { Context, Next } from "hono";
import jwt from "jsonwebtoken";

export const verifytoken = async(c:Context,next:Next)=>{
    try{
        const cookie = c.req.header("cookie");

        if(!cookie){
            throw new Error("No Token Provided");
        }

        const token = cookie.split("; ").find((row)=>row.startsWith("accessToken"))?.split("=")[1];

        if(!token){
            throw new Error("No Token Found");
        }

        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET not configured");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        c.set("user", decoded);

        await next();
    }catch(error:any){
        return c.json({
            success:false,
            message: error.message || "Unauthorized"
        }, 401);
    }
}