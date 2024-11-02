import UserModel  from "../models/UserModel";

import {UserUpdateEntry, UserNewEntry} from "../types/UserTypes";
import ResourceNotFoundError from "../errors/ResourceNotFoundError";
import NotValidError from "../errors/NotValidError";

export default class UserService {
    private MODEL = UserModel; 

    public create = async (entry: UserNewEntry) => {
        const newUser = this.MODEL.build(entry);
        const isValid = await newUser.validate();

        if(isValid == null) throw new NotValidError();

    };

    public getById = async (id: number) => {
        const user = await this.MODEL.findByPk(id);
        if(!user) throw new ResourceNotFoundError(`Usuario con id ${id} no fue encontrado en la base de datos.`);

        return user;
    };

    public update = async (id: number, entry: UserUpdateEntry) => {
        const user = await this.MODEL.findByPk(id);
        if(!user) throw new ResourceNotFoundError(`Usuario con id ${id} no fue encontrado en la base de datos.`);

        user.update(entry); 
    };


}