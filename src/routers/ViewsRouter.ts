import BaseRouter from "./BaseRouter";
import ViewsController from "../controllers/ViewsController";

//=========================================================================================================
const controller = new ViewsController();

export default class ViewsRouter extends BaseRouter{
    // ATENCIÓN: Politica '_VIEW' unicamente para vistas que
    // tiene que redireccionar a localhost:8080/login si el 
    // token del usuario es valido, esta expirado o ausente.
    init(){
        this.get('/login', ['PUBLIC'], controller.login);

        this.get('/', ['_VIEW', 'AUTHORIZED'], controller.home);
    };
}