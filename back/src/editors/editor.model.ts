import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { GameEditor } from '../gamesEditors/game-editor.model';

@Table({ tableName: 'editors', timestamps: false })
export class Editor extends Model<Editor> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING(255),
  })
  name: string;

  @BelongsToMany(() => Game, () => GameEditor)
  games: Game[];
}
