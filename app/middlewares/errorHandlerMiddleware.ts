import * as Express from 'express';
import { ApiError } from '../common/ApiErrorResponse';

export class ErrorHandlerMiddleware{
    static handler(error:any, request: Express.Request, response: Express.Response, next: Express.NextFunction){
        console.log("Executing Error Middleware.")
        ApiError.handle(error, response);
    }
}