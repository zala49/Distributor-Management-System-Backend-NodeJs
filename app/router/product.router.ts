import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as ProductController from '../controller/product.controller';

let router = express.Router();

router.get("/getProducts", runAsyncWrapper(ProductController.getProducts));
router.get("/insertProduct", runAsyncWrapper(ProductController.insertProduct));
router.get("/updateProduct", runAsyncWrapper(ProductController.updateProduct));
router.get("/deleteProduct", runAsyncWrapper(ProductController.deleteProduct));

export default router;