import express, { Express, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { CityEntity } from '../model/Tables/city.model';
import { nameOf } from '../helpers/helper';

export const insertCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const returnCity = await cityRepo.upsert({
        State: req.body.State,
        District: req.body.District,
        CityName: req.body.CityName
    }, {
        conflictPaths: [nameOf<CityEntity>('State'), nameOf<CityEntity>('District'), nameOf<CityEntity>('CityName')]
    });
    return new SuccessResponse(StatusCodes.OK, returnCity, 'Added city successfully!!').send(res);
};
export const getAllCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const returnCity = await cityRepo.find({
        relations: {
            distributor_details: {
                merchant_details: true
            }
        }
    });
    if (returnCity) {
        return new SuccessResponse(StatusCodes.OK, returnCity, 'Get city successfully!!').send(res);
    };
};

export const updateCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const returnCity = await cityRepo.findOne({ where: { CityId: req.query.CityId as any } })
    const updatedData = { ...returnCity, ...req.body }
    const update = await cityRepo.update(req.query.CityId as any, updatedData);
    if (update) {
        return new SuccessResponse(StatusCodes.OK, updatedData, 'Updated city successfully!!').send(res);
    };
};

export const deleteCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const returnCity = await cityRepo.delete({ CityId: req.query.CityId as any });
    if (returnCity) {
        return new SuccessResponse(StatusCodes.OK, {}, 'City deleted successfully!!').send(res);
    };
};