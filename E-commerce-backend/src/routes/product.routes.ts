import { Hono } from "hono";
import { addOrUpdateController, deleteProductController, getAllProductController } from "../controller/product.controller";
const productRoutes = new Hono();

productRoutes.post("/createorupdate",addOrUpdateController);
productRoutes.get("/getallproduct",getAllProductController);
productRoutes.delete("/delete/:id",deleteProductController);


export default productRoutes;