import { Test, TestingModule } from '@nestjs/testing';
import { SellingGamesController } from './selling_games.controller';
import { SellingGamesService } from './selling_games.service';

describe('SellingGamesController', () => {
  let controller: SellingGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellingGamesController],
      providers: [SellingGamesService],
    }).compile();

    controller = module.get<SellingGamesController>(SellingGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
