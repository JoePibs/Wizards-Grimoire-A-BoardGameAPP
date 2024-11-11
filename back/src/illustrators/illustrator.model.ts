import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'illustrators', timestamps: false })
export class Illustrator extends Model<Illustrator> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  })
  name: string;
}
