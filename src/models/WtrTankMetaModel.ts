import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import WtrTankMetaEntry, { WtrTankMetaNewEntry } from "../interfaces/IWtrTankMeta";
import WtrTankModel from "./WtrTankModel";

@Table({
    modelName: 'WtrTankMeta`Model',
    tableName: 'WtrTankMeta',
    timestamps: true,
})

export default class WtrTankMetaModel extends Model<WtrTankMetaEntry, WtrTankMetaNewEntry> implements WtrTankMetaEntry{
    // Columnas
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            isFloat: {msg: 'Temparatura ingresada de manera invalida. Intenta nuevamente.'}
        }
    })
    declare temperature: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            isFloat: {msg: 'PH ingresado de manera invalida. Intenta nuevamente'}
        }
    })
    declare ph: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare img_path: number;

    @ForeignKey(() => WtrTankModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare wtr_tank_id: number;


    // Relaciones
    @BelongsTo(() => WtrTankModel)
    declare wtr_tank: WtrTankModel;
}