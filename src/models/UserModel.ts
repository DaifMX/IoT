import { Model, Table, Column, DataType, BeforeCreate, HasOne } from "sequelize-typescript";
import bcrypt from 'bcrypt';

import UserEntry, { UserNewEntry } from "../interfaces/IUser";
import WtrTankModel from "./WtrTankModel";

@Table({
    modelName: 'UserModel',
    tableName: 'User',
    timestamps: true,
})

export default class UserModel extends Model<UserEntry, UserNewEntry> implements UserEntry{
    // Columnas
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;
    
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {msg: 'Correo electronico no ingresado. Intente nuevamnete.'},
            isEmail: {msg: 'Correo electronico invalido. Intente nuevamente.'},
        },
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'Contraseña no ingresada. Intente nuevamente.'},
        },
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'Nombre no ingresado. Intente nuevamnete.'},
            is: {args: /^[A-Za-z\s]+$/, msg: 'Caracter invalido ingresado en el nombre. Solo se permiten los caracteres [Aa-Zz]. Intente nuevamente.'}
        },
    })
    declare first_name: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'Apellido no ingresado. Intente nuevamnete.'},
            is: {args: /^[A-Za-z\s]+$/, msg: 'Caracter invalido ingresado en el apellido. Solo se permiten los caracteres [Aa-Zz]. Intente nuevamente.'}
        },
    })
    declare last_name: string;
    

    // Relaciones
    @HasOne(() => WtrTankModel)
    declare wtr_tank: WtrTankModel;
    

    // Metodos 
    @BeforeCreate
    static encrypt = async (e: UserModel): Promise<void> => { 
        //Encriptar la contraseña con un salt.
        if (e.password && e.changed('password')){ 
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(e.password, salt);
            e.password = hash;
        }
    };

    public isPasswordValid = async (password: string): Promise<Boolean> => {
        return await bcrypt.compare(password, this.password);
    };
}