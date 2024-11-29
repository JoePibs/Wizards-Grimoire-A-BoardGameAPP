import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { Editor } from '../editors/editor.model';

@Table({ tableName: 'game_editors', timestamps: false }) // Si besoin d'un timestamp
export class GameEditor extends Model<GameEditor> {
  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  game_id: number;

  @ForeignKey(() => Editor)
  @Column({ type: DataType.INTEGER })
  editor_id: number;
}
