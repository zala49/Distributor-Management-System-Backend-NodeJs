import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as OrderController from '../controller/order.controller';

let router = express.Router();

router.get("/getOrders", runAsyncWrapper(OrderController.getOrders));
router.get("/insertOrder", runAsyncWrapper(OrderController.insertOrder));
router.get("/updateOrders", runAsyncWrapper(OrderController.updateOrders));
router.get("/deleteOrder", runAsyncWrapper(OrderController.deleteOrder));

export default router;