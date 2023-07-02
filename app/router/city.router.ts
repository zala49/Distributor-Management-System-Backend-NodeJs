import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as CityController from '../controller/city.controller';

let router = express.Router();

router.get("/getCity", runAsyncWrapper(CityController.getAllCity));
router.get("/insertCity", runAsyncWrapper(CityController.insertCity));
router.get("/updateCity", runAsyncWrapper(CityController.updateCity));
router.get("/deleteCity", runAsyncWrapper(CityController.deleteCity));

export default router;