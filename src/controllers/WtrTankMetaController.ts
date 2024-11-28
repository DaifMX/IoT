import {Request, Response} from 'express';

import AuthService from '../services/AuthService';

import ResourceNotFoundError from "../errors/ResourceNotFoundError";

export default class WtrTankMetaController {
    private service: any;
    private authService = new AuthService(); 

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

    public update = async (req: Request, res: Response) => {
        try {
            const queryEid = parseInt(req.query.uid as string);
            let field = req.query.field as string;

            const requesterTkn = this.authService.parseToken(req.cookies.token);
            const requesterEid = requesterTkn.uid;

            let entryEid;
            if (!queryEid) entryEid = requesterEid;
            entryEid = queryEid;

            const entry = req.body[field];
            console.log(entry);
            const updatedField = await this.service.patchField(entryEid, field, entry);
            return res.sendSuccess({ ...updatedField, field }, 'Campo actualizado con exito.');

        } catch (error: any) {
            console.error(error);
            return res.sendInternalServerError(error.message);
        }
    };

    public updatePhoto = async (req: Request, res: Response) => {
        try {
            const fileName = req.file?.filename;
            const queryEid = parseInt(req.query.eid as string);
            let field = 'img_path';

            if (!fileName) return res.sendBadRequest('Archivo no recibido.');

            const requesterTkn = this.authService.parseToken(req.cookies.token);
            const requesterEid = requesterTkn.uid;

            let entry, entryEid;
            if (!queryEid) entryEid = requesterEid;
            entryEid = queryEid;

            entry = `/tank_img/${entryEid}/${fileName}`;

            if (field == '_path') return res.sendBadRequest('Campo a cambiar no recibido.');

            const updatedField = await this.service.patchField(entryEid, field, entry);
            return res.sendSuccess({ ...updatedField, fileName }, 'Archivo subido con exito.');

        } catch (error: any) {
            console.error(error);
            return res.sendInternalServerError(error.message);
        }
    };
}
