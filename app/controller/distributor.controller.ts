import express, { Express, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { ErrorResponse, SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { nameOf } from '../helpers/helper';
import { DistributorEntity } from '../model/Tables/distributor.model';

export const insertDistributor = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorEntity);
    const returnDistributor = await distributorRepo.upsert({
        CityId: req.body.CityId,
        DistributorName: req.body.DistributorName,
        DistributorEmail: req.body?.DistributorEmail,
        DistributorTelNo: req.body?.DistributorTelNo,
        DistributorAddress: req.body?.DistributorAddress,
        DistributorCity: req.body?.DistributorCity,
        BankName: req.body?.BankeName,
        IFSCCode: req.body?.IFSCCode,
        ChequeNumber1: req.body?.ChequeNumber1,
        ChequeNumber2: req.body.ChequeNumber2
    }, {
        conflictPaths: [nameOf<DistributorEntity>('CityId'), nameOf<DistributorEntity>('DistributorId')]
    });
    return new SuccessResponse(StatusCodes.OK, returnDistributor, 'Added Distributor successfully!!').send(res);
};
export const getAllDistributor = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorEntity);
    const returnDistributor = await distributorRepo.find(
        {
            relations: {
                city_details: true,
                merchant_details: true
            }
        }
    );
    if (returnDistributor) {
        return new SuccessResponse(StatusCodes.OK, returnDistributor, 'Get Distributor successfully!!').send(res);
    };
};

export const getDistributorById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorEntity);
    const returnDistributor = await distributorRepo.findOne({ 
        relations: {
            city_details: true,
            merchant_details: true
        },
        where: { DistributorId: req.query.DistributorId as any }});
    if (returnDistributor) {
      return new SuccessResponse(StatusCodes.OK, returnDistributor, 'Get Distributor successfully!!').send(res);
  } else return new ErrorResponse(StatusCodes.NOT_FOUND, 'No Distributor found!!').send(res);
  };

export const updateDistributor = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorEntity);
    const returnDistributor = await distributorRepo.findOne({ where: { DistributorId: req.query.DistributorId as any } })
    const updatedData = { ...returnDistributor, ...req.body }
    const update = await distributorRepo.update(req.query.DistributorId as any, updatedData);
    if (update) {
        return new SuccessResponse(StatusCodes.OK, updatedData, 'Updated distributor successfully!!').send(res);
    };
};

export const deleteDistributor = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorEntity);
    const returnDistributor = await distributorRepo.delete({ DistributorId: req.query.DistributorId as any });
    if (returnDistributor) {
        return new SuccessResponse(StatusCodes.OK, {}, 'Distributor deleted successfully!!').send(res);
    };
};