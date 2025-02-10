import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Editor } from '../editors/editor.model';
import { GameEditor } from 'src/gamesEditors/game-editor.model';
import { GameIllustrator } from 'src/gamesIllustrators/game-illustrator.model';
import { Illustrator } from 'src/illustrators/illustrator.model';
import { GameMechanic } from 'src/gamesMechanics/game-mechanic.model';
import { Mechanic } from 'src/mechanics/mechanic.model';
import { GameTheme } from 'src/gamesThemes/game-theme.model';
import { Theme } from 'src/themes/theme.model';
import { GameAuthor } from 'src/gamesAuthors/game-author.model';
import { Author } from 'src/authors/author.model';




@Table({ tableName: 'games', timestamps: false })
export class Game extends Model<Game> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  name: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  link_philibert: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  image: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  sku: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  title_long_description: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  long_description: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1500),
  })
  short_description: string;

  @Column({
    allowNull: true,
    type: DataType.DOUBLE,
  })
  note: number;

  @Column({
    allowNull: true,
    type: DataType.DOUBLE,
  })
  price: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
  })
  lang: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  min_age: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  min_duration: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  max_duration: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  min_players: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  max_players: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  lang_notice: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  universe: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  extension: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
  })
  video_embed: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  video_link: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  eng_link: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  eng_name: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  eng_long_text: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  eng_short_description: string;

  @BelongsToMany(() => Editor, () => GameEditor)
  editors: Editor[];
  @BelongsToMany(() => Illustrator, () => GameIllustrator)
  illustrators: Illustrator[];
  @BelongsToMany(() => Mechanic, () => GameMechanic)
  mechanics: Mechanic[];
  @BelongsToMany(() => Theme, () => GameTheme)
  themes: Theme[];
  @BelongsToMany(() => Author, () => GameAuthor)
  authors: Author[];
}
