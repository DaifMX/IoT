import {Request, Response} from 'express';
import { rotateMotor } from '../raspi/ph_and_stpr_mtr';
import ResourceNotFoundError from "../errors/ResourceNotFoundError";

export default class WtrTankController {
    private service: any;

    constructor(service: any) {
        this.service = service;
    };

    public getById = async (req: Request, res: Response) => {
        try {
            const uid = parseInt(req.query.uid as string);

            const user = await this.service.getById(uid);
            return res.sendSuccess(user);

        } catch(err: any){
            if(err instanceof ResourceNotFoundError) return res.sendNotFound(err.message);
            return res.sendInternalServerError(err.message);
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const entry = req.body;
            const newWtrTank = await this.service.create(entry);
            return res.sendSuccess(newWtrTank, 'WtrTank created');

        } catch(err: any){
            return res.sendInternalServerError(err.message);
        }
    };

    public dropFood = async (_req: Request, res: Response) => {
        try {
            await rotateMotor();
            return res.sendSuccess({}, 'Motor rotated');

        } catch(err: any){
            return res.sendInternalServerError(err.message);
        }
    };
}