import WtrTankController from "../controllers/WtrTankController";
import WtrTankService from "../services/WtrTankService";
import BaseRouter from "./BaseRouter";

//=========================================================================================================
const service = new WtrTankService();
const controller = new WtrTankController(service);

export default class WtrTankRouter extends BaseRouter{
    init(){
        this.post('/create', ['AUTHORIZED'], controller.create);
        this.get('/getById', ['AUTHORIZED'], controller.getById);
        this.get('/dropFood', ['AUTHORIZED'], controller.dropFood);
    };
}