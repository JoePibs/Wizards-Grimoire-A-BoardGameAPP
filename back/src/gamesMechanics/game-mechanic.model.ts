import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { Mechanic } from '../mechanics/mechanic.model';

@Table({ tableName: 'game_mechanics', timestamps: false }) // Si besoin d'un timestamp
export class GameMechanic extends Model<GameMechanic> {
  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  game_id: number;

  @ForeignKey(() => Mechanic)
  @Column({ type: DataType.INTEGER })
  mechanic_id: number;
}
