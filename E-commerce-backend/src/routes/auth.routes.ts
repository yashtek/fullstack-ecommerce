import { Hono } from "hono";
const authRoutes = new Hono()

import { loginController,signupController,RefershAccessTokenController,logoutController, getUserController} from "../controller/auth.controller";

authRoutes.post("/login",loginController);
authRoutes.post("/signup",signupController);
authRoutes.post("/refresh",RefershAccessTokenController);
authRoutes.get("/me",getUserController);
authRoutes.post("/logout",loginController);

export default authRoutes;
