import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as CityController from '../controller/city.controller';

let router = express.Router();

router.get("/getCity", runAsyncWrapper(CityController.getAllCity));
router.post("/insertCity", CityController.insertCity);
router.put("/updateCity", runAsyncWrapper(CityController.updateCity));
router.delete("/deleteCity", runAsyncWrapper(CityController.deleteCity));

export default router;