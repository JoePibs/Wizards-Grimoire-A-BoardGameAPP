import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { SellingGame } from '../selling_games/selling_game.model';
import { User } from '../users/user.model';

@Table({ tableName: 'sales', timestamps: true })
export class Sale extends Model<Sale> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => SellingGame)
  @Column({ type: DataType.INTEGER, allowNull: true })
  selling_game_id: number | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  buyer_id: number | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_validated: boolean;

  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  status: string;

  // Associations
  @BelongsTo(() => SellingGame)
  sellingGame: SellingGame;

  @BelongsTo(() => User, { as: 'buyer' })
  buyer: User;
}
