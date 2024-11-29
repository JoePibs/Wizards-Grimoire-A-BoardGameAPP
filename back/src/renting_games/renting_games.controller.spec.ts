import { Test, TestingModule } from '@nestjs/testing';
import { RentingGamesController } from './renting_games.controller';
import { RentingGamesService } from './renting_games.service';

describe('RentingGamesController', () => {
  let controller: RentingGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentingGamesController],
      providers: [RentingGamesService],
    }).compile();

    controller = module.get<RentingGamesController>(RentingGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
