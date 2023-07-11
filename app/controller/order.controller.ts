import { CustomRequest } from "../interfaces/request.interface";
import { Response } from 'express';
import { connectToDatabase } from "../utils/DatabaseUtils";
import { OrdersEntity } from "../model/Tables/order.model";
import { ErrorResponse, SuccessResponse } from "../common/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { nameOf } from "../helpers/helper";
import { USER_ROLES } from "../../config/constants";
import { BadRequestError } from "../common/ApiErrorResponse";

export const insertOrder = async (req: CustomRequest, res: Response) => {
    // const userLoginInfo = await AuthTokenService.getUserInfoDbByAuth0UserId(req.auth?.sub!);
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const returnOrders = await orderRepo.upsert({
        OrderDate: req.body.OrderDate,
        ProductId: req.body.ProductId,
        ProductQuantity: req.body.ProductQuantity,
        SalesMen: 'Login Person', // Need to add ,
        MerchantId: req.body.MerchantId
    }, {
        conflictPaths: [nameOf<OrdersEntity>('ProductId'), nameOf<OrdersEntity>('SalesMen'), nameOf<OrdersEntity>('ProductQuantity')]
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

export const getOrderById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const adminListOfOrder = await orderRepo.findOne({
        select: {
            product_details: { ProductId: true, ProductName: true, ProductCategory: true },
            OrderId: true, OrderDate: true, ProductQuantity: true, 
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
        },
        where: {OrderId: req.query.OrderId as any}
    });
    if(adminListOfOrder){
        return new SuccessResponse(StatusCodes.OK, adminListOfOrder, 'Get orders successfully!!').send(res);
    } else return new ErrorResponse(StatusCodes.NOT_FOUND, 'No order found!!').send(res);

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