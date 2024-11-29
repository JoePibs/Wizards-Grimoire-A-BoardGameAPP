import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { Author } from '../authors/author.model';

@Table({ tableName: 'game_authors', timestamps: false }) // Si besoin d'un timestamp
export class GameAuthor extends Model<GameAuthor> {
  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  game_id: number;

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER })
  author_id: number;
}
