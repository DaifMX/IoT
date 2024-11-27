import {Request, Response} from 'express';

import { ValidationError } from "sequelize";
import ResourceNotFoundError from "../errors/ResourceNotFoundError";


export default class UserController {
    private service: any;
    // private authService = new AuthService();

    constructor(service: any) {
        this.service = service;
    };

    // Crear usuario
    public create = async (req: Request, res: Response) => {
        try {
            const entry = req.body;
            const user = await this.service.create(entry);
            res.sendAccepted(user);

        } catch (err: any) {
            console.error(err.message);
            if (err instanceof ValidationError) return res.sendBadRequest('Argumentos invalidos.', err.getFieldErrors());
            return res.sendInternalServerError(err.message);
        }
    };

    // Obtener usuario
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

    public secret = async (_req: Request, res: Response) => {
        return res.sendSuccess({}, "ffmpeg -f v4l2 -i /dev/video0 -c:v libvpx -preset ultrafast -b:v 1M -f webm -");
    };
}