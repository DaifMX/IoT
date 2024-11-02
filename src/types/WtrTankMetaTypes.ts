import WtrTankModel from "../models/WtrTankModel";

export default interface WtrTankMetaEntry {
    id: number;
    temperature: number;
    ph: number;
    wtr_tank_id: number;
    wtr_tank: WtrTankModel;
}

export type WtrTankMetaNewEntry = Omit<WtrTankMetaEntry, 'id'>;
export type WtrTankMetaUpdateEntry = Partial<WtrTankMetaNewEntry>;