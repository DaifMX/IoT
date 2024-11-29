import WtrTankMetaModel from "../models/WtrTankMetaModel";

import ResourceNotFoundError from "../errors/ResourceNotFoundError";

export default class WtrTankService {
    private MODEL = WtrTankMetaModel;

    public getById = async (id: number) => {
        const user = await this.MODEL.findByPk(id);
        if(!user) throw new ResourceNotFoundError(`Acuario con id ${id} no fue encontrado en la base de datos.`);

        return user;
    };

    public create = async (data: any) => {
        const user = await this.MODEL.create(data);
        return user;
    };
}