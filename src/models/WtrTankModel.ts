import { Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import WtrTankEntry, { WtrTankNewEntry } from "../types/WtrTankTypes";
import WtrTankMetaModel from "./WtrTankMetaModel";
import UserModel from "./UserModel";

@Table({
    modelName: 'WtrTankModel',
    tableName: 'WtrTank',
    timestamps: true,
})

export default class WtrTankModel extends Model<WtrTankEntry, WtrTankNewEntry> implements WtrTankEntry{
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
        allowNull: false,
        validate: {
            notNull: {msg: 'Nombre no ingresado. Intente nuevamnete.'},
            isAlpha: {msg: 'Caracter invalido ingresado en el nombre. Solo se permiten los caracteres [Aa-Zz]. Intente nuevamente.'}
        }
    })
    declare name: string;

    @Column({
        type: DataType.TIME,
        allowNull: true,
    })
    declare food_schedule_time: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare user_id: number;

    // Relaciones
    @BelongsTo(() => UserModel)
    declare user: UserModel;

    @HasMany(() => WtrTankMetaModel)
    declare wtr_tank_meta: WtrTankMetaModel[];
}