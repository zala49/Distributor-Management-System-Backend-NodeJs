import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as ProductController from '../controller/product.controller';

let router = express.Router();

router.get("/getProducts", runAsyncWrapper(ProductController.getProducts));
router.get("/getProductById", runAsyncWrapper(ProductController.getProductById));
router.post("/insertProduct", runAsyncWrapper(ProductController.insertProduct));
router.put("/updateProduct", runAsyncWrapper(ProductController.updateProduct));
router.delete("/deleteProduct", runAsyncWrapper(ProductController.deleteProduct));

export default router;