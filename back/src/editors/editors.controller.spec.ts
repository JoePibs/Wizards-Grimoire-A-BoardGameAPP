import { Test, TestingModule } from '@nestjs/testing';
import { EditorsController } from './editors.controller';
import { EditorsService } from './editors.service';

describe('EditorsController', () => {
  let controller: EditorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditorsController],
      providers: [EditorsService],
    }).compile();

    controller = module.get<EditorsController>(EditorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
