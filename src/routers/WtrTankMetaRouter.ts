import WtrTankMetaController from "../controllers/WtrTankMetaController";
import WtrTankMetaService from "../services/WtrTankMetaService";
import BaseRouter from "./BaseRouter";

//=========================================================================================================
const service = new WtrTankMetaService();
const controller = new WtrTankMetaController(service);

export default class WtrTankMetaRouter extends BaseRouter{
    init(){
        this.post('/create', ['AUTHORIZED'], controller.create);
        this.get('/getById', ['AUTHORIZED'], controller.getById);
    };
}