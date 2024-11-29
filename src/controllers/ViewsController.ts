import { Response, Request } from 'express';

import AuthService from '../services/AuthService';

import getTemperature from '../raspi/ThermoScript';
import {getPh} from '../raspi/ph_and_stpr_mtr';

// import UserService from '../services/UserService';

//=========================================================================================================
export default class ViewsController {
    private BASE_PORT = process.env.EXPRESS_PORT;
    private BASE_URL = process.env.API_BASE_URL ? `${process.env.API_BASE_URL}:${this.BASE_PORT}/api` : `http://localhost:${this.BASE_PORT}/api`;
        private authService = new AuthService();
    // private userService = new UserService();


    public login = (_req: Request, res: Response) => {
        //Revisar que el usuario no esta autorizado para poder hacer un login nuevo
        const GENERAL_FILE_NAME = 'Login';
        // this.userService.create({
        //     email: 'admin@example.com',
        //     first_name: 'Super',
        //     last_name: 'Admin',
        //     password: 'admin'
        // })

        return res.render(GENERAL_FILE_NAME, {
            title: 'Log In',
            css: GENERAL_FILE_NAME,
            js: GENERAL_FILE_NAME,
            baseUrl: this.BASE_URL,
        });
    };


    // Main
    public home = async (req: Request, res: Response) => {
        const tkn = req.cookies.token;
        const parsedTkn = this.authService.parseToken(tkn);

        try {
            const HOME_FILE_NAME = 'Home';
            return res.render(HOME_FILE_NAME, {
                parsedTkn,
                title: 'Bubble Body',
                info: {temperature: `${await getTemperature()}°`, ph: Math.round((await getPh() as number)*10)/10},
                css: HOME_FILE_NAME,
                js: HOME_FILE_NAME,
                baseUrl: this.BASE_URL,
            });
        } catch (err: any) {
            console.error(err.message);
        }

        return res.sendInternalServerError('Unexpected error.');
    };
}