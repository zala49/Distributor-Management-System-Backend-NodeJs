import { CustomRequest } from "../interfaces/request.interface";
import { Response } from 'express';
import { connectToDatabase } from "../utils/DatabaseUtils";
import { OrdersEntity } from "../model/Tables/order.model";
import { SuccessResponse } from "../common/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { nameOf } from "../helpers/helper";
import { USER_ROLES } from "../../config/constants";
import { BadRequestError } from "../common/ApiErrorResponse";

export const insertOrder = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const returnOrders = await orderRepo.upsert({
        OrderDate: req.body.OrderDate,
        ProductId: req.body.ProductId,
        ProductName: req.body.ProductName,
        ProductCategory: req.body.ProductCategory,
        ProductQuantity: req.body.ProductQuantity,
        SalesMen: 'Login Person', // Need to add 
    }, {
        conflictPaths: [nameOf<OrdersEntity>('ProductId'), nameOf<OrdersEntity>('SalesMen'), nameOf<OrdersEntity>('ProductQuantity')]
    });
    return new SuccessResponse(StatusCodes.OK, returnOrders, 'Added order successfully!!').send(res);
};

export const getOrders = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const adminListOfOrder = await orderRepo.find();
    const salesmanListOfOrder = await orderRepo.find({
        where: { SalesMen: '' }
    });
    if (USER_ROLES.ADMIN) {
        return new SuccessResponse(StatusCodes.OK, adminListOfOrder, 'Get orders successfully!!').send(res);
    };
    if (USER_ROLES.SALESMEN) {
        return new SuccessResponse(StatusCodes.OK, salesmanListOfOrder, 'Get orders successfully!!').send(res);
    };
};

export const updateOrders = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const findOrder = await orderRepo.findOne({ where: { OrderId: req.query.Id as any } });
    const updatedData = { ...findOrder, ...req.body };
    const update = await orderRepo.update(req.query.Id as any, updatedData);
    if (update) {
        return new SuccessResponse(StatusCodes.OK, updatedData, 'Uodated order successfully!!').send(res);
    }
};

export const deleteOrder = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const findOrder = await orderRepo.findOne({ where: { OrderId: req.query.Id as any } });
    if (!findOrder) {
        throw new BadRequestError('Order not found!!');
    };
    await orderRepo.delete({ OrderId: req.query.Id as any });
    return new SuccessResponse(StatusCodes.OK, {}, 'Deleted order successfully!!').send(res);
};