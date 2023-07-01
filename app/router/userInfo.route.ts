import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as UserController from '../controller/userInfo.controller';

let router = express.Router();

router.get("/getusers", runAsyncWrapper(UserController.getUsers));
router.get("/me", runAsyncWrapper(UserController.loginUserDetails));
router.get("/getAllRoles", runAsyncWrapper(UserController.getAllRoles));

export default router;