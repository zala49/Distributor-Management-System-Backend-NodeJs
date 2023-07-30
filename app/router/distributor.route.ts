import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as DistributorController from '../controller/distributor.controller';

let router = express.Router();

router.get("/getAllDistributor", runAsyncWrapper(DistributorController.getAllDistributor));
router.get("/getDistributorById", runAsyncWrapper(DistributorController.getDistributorById));
router.post("/insertDistributor", DistributorController.insertDistributor);
router.put("/updateDistributor", runAsyncWrapper(DistributorController.updateDistributor));
router.delete("/deleteDistributor", runAsyncWrapper(DistributorController.deleteDistributor));
router.delete("/deleteDistCity", runAsyncWrapper(DistributorController.deleteDisCity));

export default router;