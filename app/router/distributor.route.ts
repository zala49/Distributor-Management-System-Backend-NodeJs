import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as DistributorController from '../controller/distributor.controller';

let router = express.Router();

router.get("/getAllDistributor", runAsyncWrapper(DistributorController.getAllDistributor));
router.post("/insertDistributor", DistributorController.insertDistributor);
router.put("/updateDistributor", runAsyncWrapper(DistributorController.updateDistributor));
router.delete("/deleteDistributor", runAsyncWrapper(DistributorController.deleteDistributor));

export default router;