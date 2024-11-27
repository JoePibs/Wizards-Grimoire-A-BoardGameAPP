import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/user.module';
import { User } from './users/user.model';
import { Condition } from './conditions/condition.model';
import { Illustrator } from './illustrators/illustrator.model';
import { ConditionsModule } from './conditions/conditions.module';
import { IllustratorsModule } from './illustrators/illustrators.module';
import { EditorsModule } from './editors/editors.module';
import { Editor } from './editors/editor.model';
import * as dotenv from 'dotenv';
import { Mechanic } from './mechanics/mechanic.model';
import { MechanicsModule } from './mechanics/mechanics.module';
import { Theme } from './themes/theme.model';
import { ThemesModule } from './themes/themes.module';
import { GameEditor } from './gamesEditors/game-editor.model';
import { GameIllustrator } from './gamesIllustrators/game-illustrator.model';
import { GameMechanic } from './gamesMechanics/game-mechanic.model';
import { GameTheme } from './gamesThemes/game-theme.model';
import { Game } from './games/game.model';
import { GamesModule } from './games/games.module';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/author.model';
import { GameAuthor } from './gamesAuthors/game-author.model';

dotenv.config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      models: [
        User,
        Condition,
        Illustrator,
        Editor,
        Mechanic,
        Theme,
        GameEditor,
        GameIllustrator,
        GameMechanic,
        GameTheme,
        Game,
        Author,
        GameAuthor,
      ],
    }),
    UsersModule,
    ConditionsModule,
    IllustratorsModule,
    EditorsModule,
    MechanicsModule,
    ThemesModule,
    GamesModule,
    AuthorsModule,
  ],
  providers: [],
})
export class AppModule {}
