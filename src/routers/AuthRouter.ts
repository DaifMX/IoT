import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import BaseRouter from "./BaseRouter";

//=========================================================================================================
const service = new AuthService();
const controller = new AuthController(service);

export default class AuthRouter extends BaseRouter{
    init(){
        this.post('/login', ['PUBLIC'], controller.login);
        this.get('/logout', ['PUBLIC'], controller.logout); //Excepción GET: para poder ser accedido desde el navegador
        this.post('/verify', ['PUBLIC'], controller.verify);
    };
}