import * as Express from 'express';

export interface CustomRequest extends Express.Request{
    role?: string;
    auth?: {
        sub?: string
    }
}