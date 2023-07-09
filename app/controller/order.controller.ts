import { CustomRequest } from "../interfaces/request.interface";
import { Response } from 'express';
import { connectToDatabase } from "../utils/DatabaseUtils";
import { OrdersEntity } from "../model/Tables/order.model";
import { ErrorResponse, SuccessResponse } from "../common/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { nameOf } from "../helpers/helper";

export const insertOrder = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const returnOrders = await orderRepo.upsert({
        OrderDate: req.body.OrderDate,
        ProductId: req.body.ProductId,
        ProductQuantity: req.body.ProductQuantity,
        SalesmenId: req.body.SalesmanId,
        MerchantId: req.body.MerchantId
    }, {
        conflictPaths: [nameOf<OrdersEntity>('ProductId'), nameOf<OrdersEntity>('SalesmenId'), nameOf<OrdersEntity>('ProductQuantity'), nameOf<OrdersEntity>('MerchantId')]
    });
    return new SuccessResponse(StatusCodes.OK, returnOrders, 'Added order successfully!!').send(res);
};

export const getOrders = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const adminListOfOrder = await orderRepo.find({
        select: {
            product_details: { ProductId: true, ProductName: true, ProductCategory: true },
            OrderId: true, OrderDate: true, ProductQuantity: true, 
            // salesmen_details: {},
            merchant_details: {
                MerchantId: true, MerchantName: true, MerchantGSTNumber: true, MerchantCity: true,
                MerchantAddress: true, MerchantEmail: true, MerchantTelNo: true,
                distributor_details: { CityId: true, DistributorId: true, DistributorName: true, DistributorCity: true, DistributorTelNo: true, DistributorAddress: true }
            },
        },
        relations: {
            salesmen_details: true,
            merchant_details: { distributor_details: true },
            product_details: true
        }
    });
    return new SuccessResponse(StatusCodes.OK, adminListOfOrder, 'Get orders successfully!!').send(res);
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
    if (findOrder) { 
        await orderRepo.delete({ OrderId: req.query.Id as any });
        return new SuccessResponse(StatusCodes.OK, {}, 'Deleted order successfully!!').send(res);
    };
    return new ErrorResponse(StatusCodes.FORBIDDEN, 'Order not found!!').send(res);
};