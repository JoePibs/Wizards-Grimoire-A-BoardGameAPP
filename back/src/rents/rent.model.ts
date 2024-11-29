import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { RentingGame } from '../renting_games/renting_game.model';
import { User } from '../users/user.model';

@Table({ tableName: 'rents', timestamps: true })
export class Rent extends Model<Rent> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => RentingGame)
  @Column({ type: DataType.INTEGER })
  renting_game_id: number;

  @Column({
    type: DataType.DATE,
  })
  beginning_date: Date;

  @Column({
    type: DataType.DATE,
  })
  return_date: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  calculated_price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  late_penalties: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  final_price: number;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 0,
  })
  is_validated: boolean;

  @Column({
    type: DataType.STRING(100),
  })
  status: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  renter_id: number;

  // Associations
  @BelongsTo(() => RentingGame)
  rentingGame: RentingGame;

  @BelongsTo(() => User)
  renter: User;
}
