import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'illustrators', timestamps: false })
export class Illustrator extends Model<Illustrator> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;
}
