import { CustomRequest } from "../interfaces/request.interface";
import { Response } from 'express';
import { connectToDatabase } from "../utils/DatabaseUtils";
import { OrdersEntity } from "../model/Tables/order.model";
import { ErrorResponse, SuccessResponse } from "../common/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { nameOf } from "../helpers/helper";
import { BadRequestError } from "../common/ApiErrorResponse";

export const insertOrder = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const returnOrders = await orderRepo.upsert({
        OrderDate: req.body.OrderDate,
        ProductId: req.body.ProductId,
        ProductCategoryId: req.body?.ProductCategoryId,
        ProductQuantity: req.body.ProductQuantity,
        SalesMen: req.body.SalesMen,
        SalesmenId: req.body.SalesmenId,
        MerchantId: req.body.MerchantId,
        DistributorId: req.body.DistributorId,
        Packing: req.body?.Packing,
        NOS: req.body?.NOS,
        Scheme: req.body?.Scheme
    }, {
        conflictPaths: [nameOf<OrdersEntity>('ProductId'), nameOf<OrdersEntity>('SalesMen'), nameOf<OrdersEntity>('ProductQuantity')]
    });
    return new SuccessResponse(StatusCodes.OK, returnOrders, 'Added order successfully!!').send(res);
};

export const getOrders = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const adminListOfOrder = await orderRepo.find({
        relations: {
            salesmen_details: true,
            product_cat_details: { product_details: true },
            merchant_details: { city_details: true },
            distributor_details: true
        }
    });
    return new SuccessResponse(StatusCodes.OK, adminListOfOrder, 'Get orders successfully!!').send(res);
};


export const getSalesmenOrders = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const data = await orderRepo.find({
        relations: {
            salesmen_details: true,
            product_cat_details: { product_details: true },
            merchant_details: { city_details: true },
            distributor_details: true
        },
        where: { SalesmenId: req.query.SalesManId as any }
    })
    return new SuccessResponse(StatusCodes.OK, data, 'Get orders successfully!!').send(res);

}

export const getOrderById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const adminListOfOrder = await orderRepo.findOne({
        relations: {
            salesmen_details: true,
            product_cat_details: { product_details: true },
            merchant_details: { city_details: true },
            distributor_details: true
        },
        where: { OrderId: req.query.OrderId as any }
    });
    if (adminListOfOrder) {
        return new SuccessResponse(StatusCodes.OK, adminListOfOrder, 'Get orders successfully!!').send(res);
    } //else return new ErrorResponse(StatusCodes.NOT_FOUND, 'No order found!!').send(res);

};

export const updateOrders = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const orderRepo = database.getRepository(OrdersEntity);
    const findOrder = await orderRepo.findOne({ where: { OrderId: req.query.Id as any } });
    const updatedData = { ...findOrder, ...req.body };
    const update = await orderRepo.update(req.query.Id as any,{ ...req.body});
    if (update) {
        return new SuccessResponse(StatusCodes.OK, {...req.body}, 'Uodated order successfully!!').send(res);
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
