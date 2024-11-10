import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
  })
  pseudo: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: true,
    defaultValue: null,
  })
  avatar: string | null;

  @Column({
    type: DataType.STRING(150),
    allowNull: true,
    defaultValue: null,
  })
  address: string | null;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    defaultValue: null,
  })
  zip_code: string | null;

  @Column({
    type: DataType.STRING(25),
    allowNull: true,
    defaultValue: null,
  })
  city: string | null;

  @Column({
    type: DataType.STRING(45),
    allowNull: true,
    defaultValue: null,
  })
  country: string | null;

  @Column({
    type: DataType.STRING(45),
    allowNull: true,
    defaultValue: null,
  })
  phone: string | null;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
    defaultValue: 'User',
  })
  role: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  is_game_master: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  bio: string | null;
}
