import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { Theme } from '../themes/theme.model';

@Table({ tableName: 'game_themes', timestamps: false }) // Si besoin d'un timestamp
export class GameTheme extends Model<GameTheme> {
  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  game_id: number;

  @ForeignKey(() => Theme)
  @Column({ type: DataType.INTEGER })
  theme_id: number;
}
