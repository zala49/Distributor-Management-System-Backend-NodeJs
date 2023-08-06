import { Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { ErrorResponse, SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { CityEntity } from '../model/Tables/city.model';
import { nameOf } from '../helpers/helper';
import { DistributorCityEntity } from '../model/Tables/distributorCity.model';
import { In } from 'typeorm';
import { MerchantEntity } from '../model/Tables/merchant.model';
import { OrdersEntity } from '../model/Tables/order.model';

export const insertCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    for (const data of ([req.body.CityArea].flat())) {
        await cityRepo.upsert({
            State: req.body.State,
            CityName: req.body.CityName,
            CityArea: data
        }, {
            conflictPaths: [nameOf<CityEntity>('State'), nameOf<CityEntity>('CityArea'), nameOf<CityEntity>('CityName'), nameOf<CityEntity>('CityId')]
        })
    }
    return new SuccessResponse(StatusCodes.OK, 'Added city successfully!!').send(res);
};

export const getAllCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const returnCity = await cityRepo.find();
    if (returnCity) {
        return new SuccessResponse(StatusCodes.OK, returnCity, 'Get city successfully!!').send(res);
    } 
};

export const getCityById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const returnCity = await cityRepo.findOne({ where: { CityId: req.query.CityId as any } });
    if (returnCity) {
        return new SuccessResponse(StatusCodes.OK, returnCity, 'Get city successfully!!').send(res);
    } 
};

export const updateCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const disCityRepo = database.getRepository(DistributorCityEntity);
    if(req.query.CityId){
        const returnCity = await cityRepo.findOne({ where: { CityId: req.query.CityId as any } })
        const disCity = await disCityRepo.findOne({ where: {DistributorCityId: req.query.CityId as any }});
        if(disCity && req.body.CityArea) {
            await disCityRepo.update(disCity.DCityPrimary, { DistributorCityName: req.body.CityArea });
        };
        const updatedData = { ...returnCity, ...req.body }
        const update = await cityRepo.update(req.query.CityId as any, updatedData);
        if (update) {
            return new SuccessResponse(StatusCodes.OK, updatedData, 'Updated city successfully!!').send(res);
        };
    }
};

export const deleteCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const disCityRepo = database.getRepository(DistributorCityEntity);
    const merchantRepo = database.getRepository(MerchantEntity);
    const orderRepo = database.getRepository(OrdersEntity);
    if(req.query.CityId) {
        const findDisCity = await disCityRepo.find({ where: { DistributorCityId: In([req.query.CityId].flat()) as any }});
        if(findDisCity){ for(const d of findDisCity) await d.remove() }
        const findMerchant = await merchantRepo.find({ where: { CityId: req.query.CityId as any }});
        for (const m of findMerchant ){
            const findOrder = await orderRepo.find({ where: { MerchantId: In([m.MerchantId].flat())}});
            for(const o of findOrder) { await o.remove() };
            await m.remove();
        }
    }
    const returnCity = await cityRepo.delete({ CityId: req.query.CityId as any });
    if (returnCity) {
        return new SuccessResponse(StatusCodes.OK, {}, 'City deleted successfully!!').send(res);
    };
};

export const getCityByDistributorId = async (req: CustomRequest, res: Response) => {
    if(!req.query.DistributorId) return new ErrorResponse(StatusCodes.NOT_FOUND, 'Please provide distributorId!!').send(res);
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorCityEntity);
    const result = await distributorRepo.find({ where: { DistributorId: In([req.query.DistributorId].flat()) as any }})
    if(result){
        return new SuccessResponse(StatusCodes.OK, result, 'Get distributor and city!').send(res)
    } 
};