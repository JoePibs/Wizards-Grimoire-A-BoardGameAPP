import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Game } from '../games/game.model';
import { GameMechanic } from '../gamesMechanics/game-mechanic.model';

@Table({ tableName: 'themes', timestamps: false })
export class Mechanic extends Model<Mechanic> {
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

  @BelongsToMany(() => Game, () => GameMechanic)
  games: Game[];
}
