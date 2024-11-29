import WtrTankMetaModel from '../models/WtrTankMetaModel';

import { WtrTankMetaNewEntry } from '../interfaces/IWtrTankMeta';

import ResourceNotFoundError from '../errors/ResourceNotFoundError';

export default class WtrTankMetaService {
    private MODEL = WtrTankMetaModel;
    
    public getById = async (id: number) => {
        const tankMeta = await this.MODEL.findByPk(id);
        if(!tankMeta) throw new ResourceNotFoundError(`Meta-data de acuario con id ${id} no fue encontrado en la base de datos.`);

        return tankMeta;
    }

    public create = async (data: WtrTankMetaNewEntry) => {
        const tankMeta = await this.MODEL.create(data);
        return tankMeta;
    }
}