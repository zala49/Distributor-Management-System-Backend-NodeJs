import { CustomRequest } from "../interfaces/request.interface";
import * as Express from 'express';
import { ErrorResponse } from "../common/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { AuthTokenService } from "../services/authToken.service";

export class RoleMiddleware {
    static handler(requiredRole: string[]) {
        return async (request: CustomRequest, response: Express.Response, next: Express.NextFunction) => {
            try {
                let hasAccess = false;
                // const userRole = await AuthTokenService.getUserRole(request.auth?.sub!);
                // if(userRole && userRole.length > 0){
                //     request.role = userRole[0].name
                //     userRole.map((roleDetail: any)=>{
                //         hasAccess = requiredRole.includes(roleDetail.name);
                //     })
                // }
                // if(!hasAccess){
                //     return new ErrorResponse(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'Unauthorized').send(response);
                // }
                next();
            } catch (error) {
                console.log(error)
            };
        };
    };
};