import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as MerchantController from '../controller/merchant.controller';

let router = express.Router();

router.get("/getAllMerchant", runAsyncWrapper(MerchantController.getAllMerchant));
router.post("/insertMerchant", MerchantController.insertMerchant);
router.put("/updateMerchant", runAsyncWrapper(MerchantController.updateMerchant));
router.delete("/deleteMerchant", runAsyncWrapper(MerchantController.deleteMerchant));

export default router;