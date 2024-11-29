
export default interface WtrTankMetaEntry {
    id: number;
    food_time: Date;
    wtr_tank_id: number;
}

export type WtrTankMetaNewEntry = Omit<WtrTankMetaEntry, 'id' | 'food_time'>;
export type WtrTankMetaUpdateEntry = Partial<WtrTankMetaNewEntry>;