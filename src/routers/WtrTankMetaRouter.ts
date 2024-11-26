import WtrTankMetaController from "../controllers/WtrTankMetaController";
import WtrTankMetaService from "../services/WtrTankMetaService";
import BaseRouter from "./BaseRouter";

//=========================================================================================================
const service = new WtrTankMetaService();
const controller = new WtrTankMetaController(service);

export default class WtrTankMetaRouter extends BaseRouter{
    init(){
        this.get('/', ['AUTHORIZED'], controller.getOne);
    };
}