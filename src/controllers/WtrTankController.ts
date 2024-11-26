import {Request, Response} from 'express';

import ResourceNotFoundError from "../errors/ResourceNotFoundError";

export default class WtrTankController {
    private service: any;

    constructor(service: any) {
        this.service = service;
    };

    public getOne = async (req: Request, res: Response) => {
        try {
            const uid = parseInt(req.query.uid as string);

            const user = await this.service.getById(uid);
            return res.sendSuccess(user);

        } catch(err: any){
            if(err instanceof ResourceNotFoundError) return res.sendNotFound(err.message);
            return res.sendInternalServerError(err.message);
        }
    };
}
