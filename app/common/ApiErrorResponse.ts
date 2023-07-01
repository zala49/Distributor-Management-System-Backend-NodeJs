import { ReasonPhrases, getStatusCode, StatusCodes } from "http-status-codes";
import { Response } from "express";
import { ErrorResponse } from "./ApiResponse";

export abstract class ApiError extends Error {
    constructor(
        public type: ReasonPhrases,
        public message: string = 'error',
        public data?: any
    ) {
        super(type as string);
    };

    public static handle(err: ApiError, res: Response): Response {
        console.log("Handling Error");
        if (err.type) {
            console.log("Error type:", err.type);
            try {
                const code = getStatusCode(err.type);
                return new ErrorResponse<any>(code, err.data, err.message).send(
                    res
                );
            } catch (e) {
                throw new GenericError(
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    err.message,
                    err.data
                );
            }
        } else {
            console.log("Unknown", err);
            return new ErrorResponse<any>(
                StatusCodes.INTERNAL_SERVER_ERROR,
                err.data,
                err.message
            ).send(res);
        }
    }
};

export class BadRequestError extends ApiError {
    constructor(message: string = ReasonPhrases.BAD_REQUEST) {
        super(ReasonPhrases.BAD_REQUEST, message);
    }
};

export class NotFoundError extends ApiError {
    constructor(message: string = ReasonPhrases.NOT_FOUND) {
        super(ReasonPhrases.NOT_FOUND, message);
    }
};

export class UnAuthorizedError extends ApiError {
    constructor(message: string = "You are unauthorized") {
        super(ReasonPhrases.UNAUTHORIZED, message);
    }
};

export class InternalServerError extends ApiError {
    constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
        super(ReasonPhrases.INTERNAL_SERVER_ERROR, message);
    }
};

export class DatabaseConnectionError extends ApiError {
    constructor(message: string = ReasonPhrases.BAD_GATEWAY) {
        super(ReasonPhrases.BAD_GATEWAY, message)
    }
};

export class GenericError extends ApiError {
    constructor(
        type: ReasonPhrases,
        message: string = "Bad Request",
        data?: any
    ) {
        super(type, message, data);
    }
};