import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { GameTheme } from '../gamesThemes/game-theme.model';

@Table({ tableName: 'themes', timestamps: false })
export class Theme extends Model<Theme> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING(255),
  })
  name: string;

  @BelongsToMany(() => Game, () => GameTheme)
  games: Game[];
}
