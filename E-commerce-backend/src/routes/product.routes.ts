import { Hono } from "hono";
import { addOrUpdateController, deleteProductController, getAllProductController, getProductByIdController, razorpayOrderController, updateToggle, verifyRazorpayOrderController } from "../controller/product.controller";
const productRoutes = new Hono();

productRoutes.post("/createorupdate",addOrUpdateController);
productRoutes.get("/getallproduct",getAllProductController);
productRoutes.delete("/delete/:id",deleteProductController);
productRoutes.get("/get/:id",getProductByIdController);
productRoutes.patch("/toggle/:id",updateToggle);

productRoutes.post("/pay",razorpayOrderController);
productRoutes.post("/verify",verifyRazorpayOrderController);


export default productRoutes;