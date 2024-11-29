import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import WtrTankMetaEntry, { WtrTankMetaNewEntry } from "../interfaces/IWtrTankMeta";
import WtrTankModel from "./WtrTankModel";
import { NOW } from "sequelize";

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
        type: DataType.DATE,
        allowNull: false,
        defaultValue: NOW()
    })
    declare food_time: Date;

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