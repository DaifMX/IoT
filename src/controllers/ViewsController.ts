import axios from 'axios';
import { Response, Request } from 'express';

import AuthService from '../services/AuthService';

//=========================================================================================================
export default class ViewsController {
    private BASE_PORT = process.env.EXPRESS_PORT;
    private BASE_URL = process.env.API_BASE_URL ? `${process.env.API_BASE_URL}:${this.BASE_PORT}/api` : `http://localhost:${this.BASE_PORT}/api`;
    private authService = new AuthService();

    // Auth
    public register = (_req: Request, res: Response) => {
        const GENERAL_FILE_NAME = 'Register';

        return res.render(GENERAL_FILE_NAME, {
            css: GENERAL_FILE_NAME,
            js: GENERAL_FILE_NAME,
            baseUrl: this.BASE_URL,
            layout: false,
        });
    };

    public login = (_req: Request, res: Response) => {
        //Revisar que el usuario no esta autorizado para poder hacer un login nuevo
        const GENERAL_FILE_NAME = 'Login';

        return res.render(GENERAL_FILE_NAME, {
            css: GENERAL_FILE_NAME,
            js: GENERAL_FILE_NAME,
            baseUrl: this.BASE_URL,
            layout: false,
        });
    };


    // Main
    public home = async (req: Request, res: Response) => {
        const tkn = req.cookies.token;
        const parsedTkn = this.authService.parseToken(tkn);
        const uid = parsedTkn.uid;

        try {
            const HOME_FILE_NAME = 'Home';
            const apiUrl = `${this.BASE_URL}/user/?uid=${uid}`;
            const response = await axios.get<{status: string, payload: any}>(apiUrl, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie
                }
            });

            return res.render(HOME_FILE_NAME, {
                parsedTkn,
                pagination: response.data.payload,
                css: HOME_FILE_NAME,
                js: HOME_FILE_NAME,
                baseUrl: this.BASE_URL,
            });
        } catch (err: any) {
            console.error(err.message);
        }

        return res.sendInternalServerError('Unexpected error.');
    };

    public feeding = async (req: Request, res: Response) => {
        const tkn = req.cookies.token;
        const parsedTkn = this.authService.parseToken(tkn);
        const FEEDING_FILE_NAME = 'Feeding'

        return res.render(FEEDING_FILE_NAME, {
            parsedTkn,
            css: FEEDING_FILE_NAME,
            js: FEEDING_FILE_NAME,
            baseUrl: this.BASE_URL,
        });
    }
}