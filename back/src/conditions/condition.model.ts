import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'conditions', timestamps: false })
export class Condition extends Model<Condition> {
  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  condition: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  eng_condition: string;
}
