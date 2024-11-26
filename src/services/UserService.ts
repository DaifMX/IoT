import UserModel  from "../models/UserModel";

import {UserUpdateEntry, UserNewEntry} from "../interfaces/IUser";
import ResourceNotFoundError from "../errors/ResourceNotFoundError";
import NotValidError from "../errors/NotValidError";

export default class UserService {
    private MODEL = UserModel; 

    public create = async (entry: UserNewEntry) => {
        const newUser = this.MODEL.build(entry);
        const isValid = await newUser.validate();

        if(isValid == null) throw new NotValidError();
        await newUser.save();
        return newUser;
    };

    public getById = async (id: number) => {
        const user = await this.MODEL.findByPk(id);
        if(!user) throw new ResourceNotFoundError(`Usuario con id ${id} no fue encontrado en la base de datos.`);

        return user;
    };

    public getByEmail = async (email: string) => { 
        const employee = await this.MODEL.findOne({
            where: {email},
        });

        if(!employee) throw new ResourceNotFoundError(`Empleado con el email ${email} no encontrado en la base de datos.`);

        return employee;
    };

    public update = async (id: number, entry: UserUpdateEntry) => {
        const user = await this.MODEL.findByPk(id);
        if(!user) throw new ResourceNotFoundError(`Usuario con id ${id} no fue encontrado en la base de datos.`);

        user.update(entry); 
    };


}