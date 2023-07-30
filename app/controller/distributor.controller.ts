import { Response } from "express";
import { CustomRequest } from "../interfaces/request.interface";
import { ErrorResponse, SuccessResponse } from "../common/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { connectToDatabase } from "../utils/DatabaseUtils";
import { nameOf } from "../helpers/helper";
import { DistributorEntity } from "../model/Tables/distributor.model";
import { DistributorCityEntity } from "../model/Tables/distributorCity.model";
import { CityEntity } from "../model/Tables/city.model";

export const insertDistributor = async (req: CustomRequest, res: Response) => {444
  const database = await connectToDatabase();
  const distributorRepo = database.getRepository(DistributorEntity);
  const disCityRepo = database.getRepository(DistributorCityEntity);
  const cityRepo = database.getRepository(CityEntity);
  if (req.body.CityId) {
    const returnDistributor = await distributorRepo.insert({
      DistributorName: req.body.DistributorName,
      DistributorEmail: req.body?.DistributorEmail,
      DistributorTelNo: req.body?.DistributorTelNo,
      DistributorAddress: req.body?.DistributorAddress,
      BankName: req.body?.BankName,
      IFSCCode: req.body?.IFSCCode,
      ChequeNumber1: req.body?.ChequeNumber1,
      ChequeNumber2: req.body.ChequeNumber2,
    });
    for (const addData of [req.body.CityId].flat()) {
      const findCity = await cityRepo.findOne({ where: { CityId: addData } });
      if (findCity) {
        await disCityRepo.upsert({
          DistributorCityName: findCity.CityArea,
          DistributorId: returnDistributor.identifiers[0].DistributorId,
        }, {
          conflictPaths: [nameOf<DistributorCityEntity>('DistributorId'), nameOf<DistributorCityEntity>('DistributorCityName')]
        });
      }
    }
    return new SuccessResponse(
      StatusCodes.OK,
      "Added Distributor successfully!!"
    ).send(res);
  }
};
export const getAllDistributor = async (req: CustomRequest, res: Response) => {
  const database = await connectToDatabase();
  const distributorRepo = database.getRepository(DistributorEntity);
  const returnDistributor = await distributorRepo.find({relations: {dist_details: true}});
  if (returnDistributor.length) {
    return new SuccessResponse(
      StatusCodes.OK,
      returnDistributor,
      "Get Distributor successfully!!"
    ).send(res);
  } else
    return new SuccessResponse(
      StatusCodes.NOT_FOUND,
      "Distributor not found!!"
    ).send(res);
};

export const getDistributorById = async (req: CustomRequest, res: Response) => {
  const database = await connectToDatabase();
  const distributorRepo = database.getRepository(DistributorEntity);
  const returnDistributor = await distributorRepo.findOne({
    where: { DistributorId: req.query.DistributorId as any },relations: { dist_details: true },
  });
  if (returnDistributor) {
    return new SuccessResponse(
      StatusCodes.OK,
      returnDistributor,
      "Get Distributor successfully!!"
    ).send(res);
  } else
    return new SuccessResponse(
      StatusCodes.NOT_FOUND,
      "No Distributor found!!"
    ).send(res);
};

export const updateDistributor = async (req: CustomRequest, res: Response) => {
  const database = await connectToDatabase();
  const distributorRepo = database.getRepository(DistributorEntity);
  const cityRepo = database.getRepository(CityEntity)
  const disCityRepo = database.getRepository(DistributorCityEntity)
  const returnDistributor = await distributorRepo.findOne({
    where: { DistributorId: req.query.DistributorId as any },
  });
  const updatedData = { ...returnDistributor, ...req.body };
  if(req.body.CityId){
      for (const data of ([req.body.CityId].flat())) {
        const findCity = await cityRepo.findOne({where: { CityId: data }});
        console.log({findCity})
        if(findCity) {
            await disCityRepo.upsert({
              // findCity.CityId, {DistributorCityName: findCity.CityArea }
            DistributorCityId: findCity.CityId,
            DistributorId: req.query.DistributorId as string,
            DistributorCityName: findCity.CityArea
            }, {
              conflictPaths: [nameOf<DistributorCityEntity>('DistributorId'), nameOf<DistributorCityEntity>('DistributorCityName')]
            })
        }
      }
  }
  delete updatedData['CityId']
  const update = await distributorRepo.update(
    req.query.DistributorId as any,
    updatedData
  );
  if (update) {
    return new SuccessResponse(
      StatusCodes.OK,
      updatedData,
      "Updated distributor successfully!!"
    ).send(res);
  }
};

export const deleteDistributor = async (req: CustomRequest, res: Response) => {
  const database = await connectToDatabase();
  const distributorRepo = database.getRepository(DistributorEntity);
  const returnDistributor = await distributorRepo.delete({
    DistributorId: req.query.DistributorId as any,
  });
  if (returnDistributor) {
    return new SuccessResponse(
      StatusCodes.OK,
      {},
      "Distributor deleted successfully!!"
    ).send(res);
  }
};

export const deleteDisCity = async (req:CustomRequest, res:Response) => {
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorCityEntity);
    const returnDistributor = await distributorRepo.delete({
      DistributorId: req.query.DistributorId as any,
    });
    if (returnDistributor) {
      return new SuccessResponse(
        StatusCodes.OK,
        {},
        "Distributor city deleted successfully!!"
      ).send(res);
    }
};

export const updateDistCity = async (req: CustomRequest, res: Response) => {
    if(!req.query.DistributorCityId){ 
        return new ErrorResponse(StatusCodes.NOT_FOUND, 'Please provide DistributorCityId!!!').send(res)
    }
    const database = await connectToDatabase();
    const distributorRepo = database.getRepository(DistributorCityEntity);
    const update = await distributorRepo.update(req.query.DistributorCityId as any, {...req.body});
    
}