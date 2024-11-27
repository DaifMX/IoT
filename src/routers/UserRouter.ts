import BaseRouter from "./BaseRouter";
import UserService from "../services/UserService";
import UserController from '../controllers/UserController';

const service = new UserService();
const controller = new UserController(service);

export default class UserRouter extends BaseRouter {
    init(){
        this.get('/', ['AUTHORIZED'], controller.getOne);
        this.post('/', ['PUBLIC'], controller.create);
        this.get('/secret', ['PUBLIC'], controller.secret)
    }
}