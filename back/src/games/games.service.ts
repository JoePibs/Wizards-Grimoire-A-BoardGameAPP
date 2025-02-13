// games.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './game.model';
import { Editor } from '../editors/editor.model';
import { Illustrator } from '../illustrators/illustrator.model';
import { Author } from '../authors/author.model';
import { Mechanic } from '../mechanics/mechanic.model';
import { Theme } from '../themes/theme.model';
import { GameEditor } from '../gamesEditors/game-editor.model'; 
import { GameIllustrator } from '../gamesIllustrators/game-illustrator.model'; 
import { GameAuthor } from '../gamesAuthors/game-author.model';
import { GameTheme } from '../gamesThemes/game-theme.model';
import { GameMechanic } from 'src/gamesMechanics/game-mechanic.model';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game) private readonly gameModel: typeof Game,
    @InjectModel(Editor) private readonly editorModel: typeof Editor,
    @InjectModel(Author) private readonly authorModel: typeof Author,
    @InjectModel(Illustrator) private readonly illustratorModel: typeof Illustrator,
    @InjectModel(Mechanic) private readonly mechanicModel: typeof Mechanic,
    @InjectModel(Theme) private readonly themeModel: typeof Theme,
    @InjectModel(GameEditor) private readonly gameEditorModel: typeof GameEditor,
    @InjectModel(GameIllustrator) private readonly gameIllustratorModel: typeof GameIllustrator,
    @InjectModel(GameAuthor) private readonly gameAuthorModel: typeof GameAuthor,
    @InjectModel(GameTheme) private readonly gameThemeModel: typeof GameTheme,
    @InjectModel(GameMechanic) private readonly gameMechanicModel: typeof GameMechanic,
    @Inject(Sequelize) private readonly sequelize: Sequelize //
  ) {}

  // Fonction générique pour la recherche ou la création d'une entité
  private async findOrCreateEntity(model: any, name: string) {
    let entity = await model.findOne({ where: { name } });
    if (!entity) {
      entity = await model.create({ name });
    }
    return entity;
  }

  // Créer un jeu
  async createGame(createGameBody: any): Promise<Game> {
    if (!createGameBody.name) {
      throw new Error('Name is required');
    }
  
    // Démarrer une transaction pour garantir que tout est créé atomiquement
    const transaction = await this.sequelize.transaction();
    let game: Game | null = null;
  
    try {
      // Vérification et création des entités
      const editor = await this.findOrCreateEntity(this.editorModel, createGameBody.editor_name);
      const illustrator = createGameBody.illustrator_name ? await this.findOrCreateEntity(this.illustratorModel, createGameBody.illustrator_name) : null;
      const theme = createGameBody.theme_name ? await this.findOrCreateEntity(this.themeModel, createGameBody.theme_name) : null;
      const mechanic = createGameBody.mechanic_name ? await this.findOrCreateEntity(this.mechanicModel, createGameBody.mechanic_name) : null;
      const author = createGameBody.author_name ? await this.findOrCreateEntity(this.authorModel, createGameBody.author_name) : null;
    
      // Crée le jeu
      game = await this.gameModel.create(createGameBody, { transaction });
      console.log('Created game ID:', game.id);
  
      if (!game.id) {
        throw new Error('Game ID is undefined after creation');
      }
  
      // Crée les relations entre le jeu et les entités
      await this.gameEditorModel.create({ game_id: game.id, editor_id: editor.id } as GameEditor, { transaction });
      if (illustrator) await this.gameIllustratorModel.create({ game_id: game.id, illustrator_id: illustrator.id } as GameIllustrator, { transaction });
      if (theme) await this.gameThemeModel.create({ game_id: game.id, theme_id: theme.id } as GameTheme, { transaction });
      if (mechanic) await this.gameMechanicModel.create({ game_id: game.id, mechanic_id: mechanic.id } as GameMechanic, { transaction });
      if (author) await this.gameAuthorModel.create({ game_id: game.id, author_id: author.id } as GameAuthor, { transaction });
      
      // Commit transaction après toutes les insertions réussies
      await transaction.commit();
  
      // Charger les entités associées au jeu et les retourner
      const gameWithRelations = await this.gameModel.findByPk(game.id, {
        include: [
          { model: Editor, through: { attributes: [] } },
          { model: Illustrator, through: { attributes: [] } },
          { model: Theme, through: { attributes: [] } },
          { model: Mechanic, through: { attributes: [] } },
          { model: Author, through: { attributes: [] } },
        ],
      });
  
      console.log('Found game with relations:', gameWithRelations);
      if (!gameWithRelations) {
        throw new Error('Game not found after creation');
      }
  
      return gameWithRelations;
    } catch (error) {
      console.error('Transaction error:', error.message);
      throw new Error('Transaction failed: ' + error.message);
    }
  }
  
  



  // Récupérer tous les jeux
  async getAllGames(): Promise<Game[]> {
    return this.gameModel.findAll({
      where: { extension: "" },
      include: [
        { model: Editor },
        { model: Illustrator },
        { model: Mechanic },
        { model: Theme },
      ],
  });
  }

  // Récupérer tous les jeux en français
  async getFrGames(): Promise<Game[]> {
    return this.gameModel.findAll({
      where: { lang: "Français",extension:"" },
      include: [
        { model: Editor },
        { model: Illustrator },
        { model: Mechanic },
        { model: Theme },
      ],
    });
  }


  // Récupérer un jeu par ID
  async getGameById(id: number): Promise<Game> {
    const game = await this.gameModel.findByPk(id, {
      include: [
        { model: Editor },
        { model: Illustrator },
        { model: Mechanic },
        { model: Theme },
      ],
    });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`); // Lever une exception NotFoundException
    }
    return game;
  }

  // Mettre à jour un jeu
  async updateGame(id: number, updateGameBody: any): Promise<Game> {
    const game = await this.gameModel.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }

    // Validation manuelle (si nécessaire)
    if (updateGameBody.price && isNaN(updateGameBody.price)) {
      throw new Error('Price must be a number');
    }

    // Mise à jour du jeu dans la base de données
    await game.update(updateGameBody);
    return game;
  }

  // Supprimer un jeu
  async deleteGame(id: number): Promise<void> {
    const game = await this.gameModel.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }

    // Suppression du jeu dans la base de données
    await game.destroy();
  }
}
