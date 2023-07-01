import { CustomRequest } from "../interfaces/request.interface";
import express, { Express, Request, Response } from 'express';
import { connectToDatabase } from "../utils/DatabaseUtils";
import { OrdersEntity } from "../model/Tables/order.model";
import { SuccessResponse } from "../common/ApiResponse";
import { StatusCodes } from "http-status-codes";

export const getAllOrders = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const ordersRepo = database.getRepository(OrdersEntity);
    const returnOrders = ordersRepo.find({});
    return new SuccessResponse(StatusCodes.OK, returnOrders, 'Get orders successfully!!').send(res);
};