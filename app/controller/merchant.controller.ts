import { Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { ErrorResponse, SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { nameOf } from '../helpers/helper';
import { MerchantEntity } from '../model/Tables/merchant.model';
import { OrdersEntity } from '../model/Tables/order.model';

export const insertMerchant = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchantRepo.upsert({
        CityId: req.body.CityId,
        DistributorId: req.body.DistributorId,
        MerchantName: req.body.MerchantName,
        MerchantGSTNumber: req.body?.MerchantGSTNumber,
        MerchantEmail: req.body?.MerchantEmail,
        FirmName: req.body?.FirmName,
        MerchantTelNo: req.body?.MerchantTelNo,
        MerchantAddress: req.body?.MerchantAddress,
        MerchantCity: req.body?.MerchantCity
    }, {
        conflictPaths: [nameOf<MerchantEntity>('CityId'), nameOf<MerchantEntity>('DistributorId'), nameOf<MerchantEntity>('MerchantName')]
    });
    return new SuccessResponse(StatusCodes.OK, returnMerchant, 'Added merchant successfully!!').send(res);
};
export const getAllMerchant = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchantRepo.find({ relations: { city_details: true, distributor_details: true }});
    if (returnMerchant) {
        return new SuccessResponse(StatusCodes.OK, returnMerchant, 'Get merchant successfully!!').send(res);
    } 
};

export const getMerchantById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchanrRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchanrRepo.findOne({ where: { MerchantId: req.query.MerchantId as any }});
    if (returnMerchant) {
      return new SuccessResponse(StatusCodes.OK, returnMerchant, 'Get Merchant successfully!!').send(res);
  }};

export const updateMerchant = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchantRepo.findOne({ where: { MerchantId: req.query.MerchantId as any } })
    const updatedData = { ...returnMerchant, ...req.body }
    const update = await merchantRepo.update(req.query.MerchantId as any, updatedData);
    if (update) {
        return new SuccessResponse(StatusCodes.OK, updatedData, 'Updated merchant successfully!!').send(res);
    };
};

export const deleteMerchant = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const orderRepo = database.getRepository(OrdersEntity);
    if(req.query.MerchantId){
        const findOrders = await orderRepo.find({ where: { MerchantId: req.query.MerchantId as any }});
        for (const o of findOrders) { await o.remove() };
    };
    const returnMerchant = await merchantRepo.delete({ MerchantId: req.query.MerchantId as any });
    if (returnMerchant) {
        return new SuccessResponse(StatusCodes.OK, {}, 'Merchant deleted successfully!!').send(res);
    };
};

export const GetMerchantByCityId = async (req: CustomRequest, res: Response) => {
    if(!req.query.CityId){
        return new ErrorResponse(StatusCodes.NOT_FOUND, 'Please provide CityId!!').send(res);
    };
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchantRepo.find({ where: { CityId: req.query.CityId as any }, relations: { city_details: true, distributor_details: true }});
    if (returnMerchant) {
        return new SuccessResponse(StatusCodes.OK, returnMerchant,   'Merchant get successfully!!').send(res);
    } 
};