import { Express } from "express";
import {
    getProduct,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";

const router = Express.Router();

router.get("/products", getProduct);
router.get("/products/:id", getProductById);
router.post("/products", saveProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products", deleteProduct);


export default router;