import { Theme } from '../themes/theme.model';
import { GameEditor } from 'src/gamesEditors/game-editor.model';
import { GameIllustrator } from 'src/gamesIllustrators/game-illustrator.model';
import { GameMechanic } from 'src/gamesMechanics/game-mechanic.model';
import { GameTheme } from 'src/gamesThemes/game-theme.model';
import { Mechanic } from 'src/mechanics/mechanic.model';
import { Illustrator } from 'src/illustrators/illustrator.model';
import { Game } from './game.model';
import { Editor } from '../editors/editor.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Game,
      Editor,
      Illustrator,
      Mechanic,
      Theme,
      GameEditor,
      GameIllustrator,
      GameMechanic,
      GameTheme,
    ]),
    UsersModule,
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
