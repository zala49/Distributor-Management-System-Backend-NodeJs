import express, { Express, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { NotFoundError } from '../common/ApiErrorResponse';
import { AuthTokenService } from '../services/authToken.service';
import { SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';

export const loginUserDetails = async (req: CustomRequest, res: express.Response) => {
    const userInfo = await AuthTokenService.getUserInfoDbByAuth0UserId(req.auth?.sub!);
    if (!userInfo) {
        throw new NotFoundError('Data not found!')
    };
    const modifyLoginUserObj = {
        "UserId": userInfo.UserId,
        "Name": userInfo.Name,
        "Nickname": userInfo.Nickname,
        "Email": userInfo.Email,
        "EmailVerified": userInfo.EmailVerified,
        "Picture": userInfo.Picture,
        "Role": userInfo.Role
    };
    return new SuccessResponse(StatusCodes.OK, modifyLoginUserObj, 'Fetch login user details!').send(res);
};

export const getUsers = async (req: CustomRequest, res: Response) => {

    // const token = await AuthTokenService.getAccessToken();
    const token1 = await AuthTokenService.getUserInfoByToken('eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9tYmVhdC51cy5hdXRoMC5jb20vIn0..Ir8FJ_wOc8LF1AbZ.5kmDy2Y_RBxpy-p15Ue1wLaOYX0rU-96VNX6jGg5ifbvAkT4imIrP51KJsKmNWAJhm4ybH5zOY_LqxL4NmDqvdLLVnZCPhvTt6n3m7AeeO3Ngt6HNjwygCOQ_2Mrwo_BfqSFfOHzbwrNaiCIjbmgjTWlkqyoiaVV0IF2KG-xN3962KgsFJt0fpMFxaUqCVmCzOxJKI9nI-Gs5uZFsimJIRcSpF05O6ASUVkG3vnGMAZe6DYd6cmF1WJNwiAPWF-aIHVbTEbEnU_1Zo7ow91hzdOnia1zOYaGdNM8CkvGdgyHJ6Or_8Qno.WSnnVbB-XTq66hOpTCGbPw')
        // console.log(token1.data, 'token1')
    // let apiResponse = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
    //     headers: { "authorization": `Bearer ${token}` },
    // })
    // let users: Auth0UserDetails[] = []
    // if (apiResponse && apiResponse.data) {
    // const database = await connectToDatabase();
    // let userInfoRepo = database.getRepository(UserInfoEntity);
    // let dbUserData = await userInfoRepo.find();

    // users.forEach((user) => {
    //     let dbUser = dbUserData.find((dbuser) => dbuser.Auth0UserId === user.user_id)
    //     user.role_id = dbUser?.Auth0RoleId
    // })
    // }

    return new SuccessResponse(StatusCodes.OK, 'apiResponse.data', 'apiResponse').send(res)
};

export const getAllRoles = async (req: CustomRequest, res: Response) => {
    const token = await AuthTokenService.getAccessToken();
    const options1 = {
        method: "GET",
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/roles`,
        headers: { "authorization": `Bearer ${token}` },
    };

    let roles: Auth0UserDetails[] = await new Promise((res, rej) => {
        axios.request(options1).then(function (response: any) {
            res(response.data)
        }).catch(function (error: any) {
            rej(error);
        });
    })
    return new SuccessResponse(StatusCodes.OK, roles).send(res);
};

export type Auth0UserDetails = {
    identities: Identities[],
    user_id: string,
    email?: string,
    email_verified?: boolean,
    username?: string,
    phone_number?: string,
    phone_verified?: boolean,
    app_metadata?: Record<string, any>,
    user_metadata?: Record<string, any>,
    picture?: string,
    name?: string,
    nickname?: string,
    last_ip?: string,
    last_login?: string,
    logins_count?: number,
    blocked?: boolean,
    given_name?: string,
    family_name?: string,
    role_id?: string
}

type Identities = {
    provider: string,
    access_token: string,
    expires_in: number,
    user_id: number,
    connection: string,
    isSocial: boolean
}