import { Test, TestingModule } from '@nestjs/testing';
import { RentingGamesService } from './renting_games.service';

describe('RentingGamesService', () => {
  let service: RentingGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentingGamesService],
    }).compile();

    service = module.get<RentingGamesService>(RentingGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
