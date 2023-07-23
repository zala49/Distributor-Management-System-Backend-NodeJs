import { Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { ErrorResponse, SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { CityEntity } from '../model/Tables/city.model';
import { nameOf } from '../helpers/helper';
import { DistributorEntity } from '../model/Tables/distributor.model';
import { MerchantEntity } from '../model/Tables/merchant.model';
import { BadRequestError } from '../common/ApiErrorResponse';

export const insertCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    for (const data of ([req.body.CityArea].flat())) {
        const returnCity = await cityRepo.upsert({
            State: req.body.State,
            CityName: req.body.CityName,
            CityArea: data
        }, {
            conflictPaths: [nameOf<CityEntity>('State'), nameOf<CityEntity>('CityArea'), nameOf<CityEntity>('CityName')]
        })
    }
    // const returnCity = await cityRepo.upsert({
    //     State: req.body.State,
    //     CityName: req.body.CityName,
    //     CityArea: req.body.CityArea
    // }, {
    //     conflictPaths: [nameOf<CityEntity>('State'), nameOf<CityEntity>('CityArea'), nameOf<CityEntity>('CityName')]
    // });
    return new SuccessResponse(StatusCodes.OK, 'Added city successfully!!').send(res);
};

export const getAllCity = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const returnCity = await cityRepo.find();
    if (returnCity) {
        return new SuccessResponse(StatusCodes.OK, returnCity, 'Get city successfully!!').send(res);
    };
};

export const getCityById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const cityRepo = database.getRepository(CityEntity);
    const returnCity = await cityRepo.findOne({ where: { CityId: req.query.CityId as any } });
    if (returnCity) {
        return new SuccessResponse(StatusCodes.OK, returnCity, 'Get city successfully!!').send(res);
    } else return new ErrorResponse(StatusCodes.NOT_FOUND, 'No city found!!').send(res);
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

export const getDistributorFromCity = async (req: CustomRequest, res: Response) => {
    if (!req.query.CityId) throw new BadRequestError("Please provide city!!");
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorEntity);
    const returnDistributor = await distributorRepo.find({
        where: { CityId: req.query.CityId as any },
        select: {
            DistributorName: true, DistributorCity: true, DistributorEmail: true,
            DistributorAddress: true, DistributorTelNo: true, DistributorId: true,
            city_details: { CityId: true, CityName: true, CityArea: true, State: true }
        },
        relations: { city_details: true }
    });
    return new SuccessResponse(StatusCodes.OK, returnDistributor, 'Get distributor successfully!!').send(res);
};

export const getMerchantFromDistributor = async (req: CustomRequest, res: Response) => {
    if (req.query.distributorId) throw new BadRequestError("Please provide distributor!!");
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnDistributor = await merchantRepo.find({
        select: {
            CityId: true, MerchantAddress: true, MerchantCity: true, MerchantEmail: true,
            MerchantGSTNumber: true, MerchantId: true, MerchantName: true, MerchantTelNo: true,
            distributor_details: {
                DistributorName: true, DistributorCity: true, DistributorTelNo: true,
                DistributorId: true, DistributorEmail: true, DistributorAddress: true
            }
        },
        where: { DistributorId: req.query.DistributorId as any },
        relations: { distributor_details: true }
    });
    return new SuccessResponse(StatusCodes.OK, returnDistributor, 'Get merchant successfully!!').send(res);
};