import { Test, TestingModule } from '@nestjs/testing';
import { SellingGamesService } from './selling_games.service';

describe('SellingGamesService', () => {
  let service: SellingGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellingGamesService],
    }).compile();

    service = module.get<SellingGamesService>(SellingGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
