import UserModel  from "../models/UserModel";

import {UserUpdateEntry, UserNewEntry} from "../interfaces/IUser";
import ResourceNotFoundError from "../errors/ResourceNotFoundError";

export default class UserService {
    private MODEL = UserModel; 

    public create = async (entry: UserNewEntry): Promise<UserModel> => {
        const user = this.MODEL.build(entry);
        await user.validate(); //Tira error si alguna validación falla y se extrapolan los campos por medio de la clase de ValidationError de Sequelize
        await user.save();

        const finalUser = await this.MODEL.findByPk(user.id, {
            attributes: {exclude: ['password']},
        });

        return finalUser!;
    };

    public getById = async (id: number) => {
        const user = await this.MODEL.findByPk(id);
        if(!user) throw new ResourceNotFoundError(`Usuario con id ${id} no fue encontrado en la base de datos.`);

        return user;
    };

    public getByEmail = async (email: string) => { 
        const user = await this.MODEL.findOne({
            where: {email},
        });

        if(!user) throw new ResourceNotFoundError(`Empleado con el email ${email} no encontrado en la base de datos.`);

        return user;
    };

    public update = async (id: number, entry: UserUpdateEntry) => {
        const user = await this.MODEL.findByPk(id);
        if(!user) throw new ResourceNotFoundError(`Usuario con id ${id} no fue encontrado en la base de datos.`);

        user.update(entry); 
    };


}