export default interface WtrTankEntry {
    id: number;
    name: string;
    user_id: number;
};

export type WtrTankNewEntry = Omit<WtrTankEntry, 'id'>;
export type WtrTankUpdateEntry = Partial<WtrTankEntry>;