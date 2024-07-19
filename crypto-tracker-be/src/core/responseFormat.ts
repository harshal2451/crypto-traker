import express from 'express';

export interface successResponse {
    type: string;
    code: number,
    content: any,
}
export class ResponseFormat {

    constructor() { }

    handleSuccess(res: express.Response, obj: successResponse) {
        const {
            code,
            type,
            content,
        } = obj;
        return res.status(code).json({
            code,
            type,
            content,
        });
    }

    handleError(res: express.Response, obj: any) {
        const payload = {
            code: obj.statusCode,
            type: 'error',
            content: obj.payload.message
        }
        res.status(obj.statusCode).json(payload);
    }
    

    handleErrorCustom(obj: any) {
        const res = express.response;
        res.status(obj.statusCode).json(obj);
    }
}