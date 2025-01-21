import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { User } from '../users/user.model';
import { Condition } from '../conditions/condition.model';

@Table({ tableName: 'renting_games', timestamps: false })
export class RentingGame extends Model<RentingGame> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER, allowNull: false })
  game_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  owner_id: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price_per_day: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price_per_week: number;

  @ForeignKey(() => Condition)
  @Column({ type: DataType.INTEGER, allowNull: true })
  condition_id: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  caution_price: number;

  @AllowNull(true)
  @Column({ type: DataType.STRING(300), allowNull: true })
  owner_comment: string;

  // Associations
  @BelongsTo(() => Game, { foreignKey: 'game_id' })
  game: Game;

  @BelongsTo(() => User, { foreignKey: 'owner_id' })
  owner: User;

  @BelongsTo(() => Condition)
  condition: Condition;
}
