import express, { NextFunction } from 'express';

export function nameOf<T>(key: keyof T) {
    return key
};

export function runAsyncWrapper(cb: (req: express.Request, res: express.Response, next: NextFunction) => Promise<unknown>) {
    return function (req: express.Request, res: express.Response, next: NextFunction) {
        cb(req,res,next).catch(next)
    }
};