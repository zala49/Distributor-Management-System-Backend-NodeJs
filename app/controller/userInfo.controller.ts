import express, { Express, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { BadRequestError, NotFoundError } from '../common/ApiErrorResponse';
// import { AuthTokenService } from '../services/authToken.service';
import { ErrorResponse, SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { UserInfoEntity } from '../model/Tables/userInfo.model';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { development } from '../../config/environment';

export const loginUserDetails = async (req: CustomRequest, res: express.Response) => {
    return new SuccessResponse(StatusCodes.OK, 'Fetch login user details!').send(res);
};

export const getUsers = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const userRepo = database.getRepository(UserInfoEntity);
    const userData = await userRepo.find();
    if (userData.length) {
        return new SuccessResponse(StatusCodes.OK, userData, 'User get successfully!!').send(res)
    } else throw new BadRequestError("No User found!!");
};

export const getUsersById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const userRepo = database.getRepository(UserInfoEntity);
    const userData = await userRepo.findOne({where : {UserId: req.query.UserId as any}});
    if (userData) {
        return new SuccessResponse(StatusCodes.OK, userData, 'User get successfully!!').send(res)
    } else return new ErrorResponse(StatusCodes.NOT_FOUND,"No User found!!").send(res);
};

export const signUp = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const userRepo = database.getRepository(UserInfoEntity);
    const findUser = await userRepo.findOne({ where: { Email: req.body.Email } });
    if (!findUser) {
        if (!req.body.Password) throw new BadRequestError('password not found!!');
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.Password, 10, async (err, hase) => {
                console.log(hase, 'hase')
                if (err) {
                    res.send(err)
                } else {
                    await userRepo.insert({
                        Name: req.body.Name,
                        Email: req.body.Email,
                        Picture: req.body?.Picture,
                        Password: hase
                    }).then((result) => {
                        const token = jwt.sign({ Email: req.body.Email, Name: req.body.Name },
                            development.managementApiCred.client_secret, { expiresIn: "7d" });
                        const response: any = { result, token };
                        return new SuccessResponse(StatusCodes.OK, response, 'Sign up successfully!!').send(res);
                    }).catch((err) => res.send(err));
                }
            })
        })

    } else return new ErrorResponse(StatusCodes.CONFLICT, 'User existed!!').send(res);

};


export const login = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const userRepo = database.getRepository(UserInfoEntity);
    const findUser = await userRepo.findOne({ where: { Email: req.body.Email } });
    if (findUser) {
        if (!req.body.Password) throw new BadRequestError('password not found!!');
        bcrypt.compare
            (req.body.Password, findUser.Password, async (err, logUser) => {
                console.log(logUser, 'hase')
                if (logUser === false) {
                    return new ErrorResponse(StatusCodes.BAD_REQUEST, 'User not found!!').send(res);
                } else {
                    const token = jwt.sign({ Email: findUser.Email, Name: findUser.Name },
                        development.managementApiCred.client_secret, { expiresIn: "7d" });
                    const response: any = { findUser, token };
                    return new SuccessResponse(StatusCodes.OK, response, 'Login successfully!!').send(res);
                }
            });
    } else return new ErrorResponse(StatusCodes.CONFLICT, 'User not found!!').send(res);

};