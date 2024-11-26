import { Request, Response } from "express";

import ResourceNotFoundError from "../errors/ResourceNotFoundError";
import RuntimeError from "../errors/RuntimeError";

//=========================================================================================================
export default class AuthController {
    private service: any;

    constructor(service: any){
        this.service = service;
    };

    public login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;
            if(!email || !password) return res.sendBadRequest('No se recibio email y/o contraseña.');

            const token = await this.service.login(email, password);

            // Guardar cookie con el token
            const cookieExpiricy = 24 * 60 * 60 * 1000;
            return res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                expires: new Date(Date.now() + cookieExpiricy)
            }).sendAccepted({});

        } catch (err: any){
            console.error(err);
            if(err instanceof ResourceNotFoundError || err instanceof RuntimeError) res.sendBadRequest('Creedenciales incorrectas.');
            else res.sendInternalServerError('Error desconocido. Contacte un administrador.');
        }
    };

    public verify = async (req: Request, res: Response) => {
        try {
            const token = req.cookies.token;
            if(!token) return res.sendUnauthorized('Token not found');

            const verifiedToken = this.service.verifyToken(token);
            if(verifiedToken) return res.sendAccepted({});

        } catch (err) {
            console.error(err);
            return res.sendUnauthorized('Unexpected error');
        }
    };

    public logout = (_req: Request, res: Response) => {
        return res.clearCookie('token').redirect('/login');; // Borra la cookie y redirige a login
    };
}