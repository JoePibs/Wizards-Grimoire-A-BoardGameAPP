import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { GameAuthor } from '../gamesAuthors/game-author.model';

@Table({ tableName: 'authors', timestamps: false })
export class Author extends Model<Author> {
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

  @BelongsToMany(() => Game, () => GameAuthor)
  games: Game[];
}
