import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Game } from '../games/game.model';
import { Condition } from '../conditions/condition.model';

@Table({ tableName: 'selling_games', timestamps: false })
export class SellingGame extends Model<SellingGame> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  owner_id: number;

  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  game_id: number;

  @ForeignKey(() => Condition)
  @Column({ type: DataType.INTEGER })
  condition_id: number;

  @Column({ type: DataType.FLOAT })
  price: number;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  shipping_price: number;

  @Column({
    type: DataType.STRING(45),
    defaultValue: 'Retrait chez le vendeur',
  })
  shipping_method: string;

  @BelongsTo(() => User, { foreignKey: 'owner_id', as: 'owner' })
  owner: User;
  @BelongsTo(() => Game, { foreignKey: 'game_id', as: 'game' })
  game: Game;
  @BelongsTo(() => Condition, { foreignKey: 'condition_id', as: 'condition' })
  condition: Condition;
}
