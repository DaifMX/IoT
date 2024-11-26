export default interface UserEntry {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export type UserNewEntry = Omit<UserEntry, 'id'>;
export type UserUpdateEntry = Partial<UserNewEntry>;