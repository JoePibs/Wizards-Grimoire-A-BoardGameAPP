import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { Illustrator } from '../illustrators/illustrator.model';

@Table({ tableName: 'game_illustrators', timestamps: false }) // Si besoin d'un timestamp
export class GameIllustrator extends Model<GameIllustrator> {
  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  game_id: number;

  @ForeignKey(() => Illustrator)
  @Column({ type: DataType.INTEGER })
  illustrator_id: number;
}
