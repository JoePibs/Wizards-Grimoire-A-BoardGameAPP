import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { GameIllustrator } from '../gamesIllustrators/game-illustrator.model';

@Table({ tableName: 'illustrators', timestamps: false })
export class Illustrator extends Model<Illustrator> {
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

  @BelongsToMany(() => Game, () => GameIllustrator)
  games: Game[];
}
