import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

// Mock du module Authors
jest.mock('./authors.service');
jest.mock('./authors.controller');

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  const mockAuthorsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: mockAuthorsService,
        },
      ],
    })
    .overrideProvider(AuthorsService)
    .useValue(mockAuthorsService)
    .compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Test Author'
      };
      const expectedResult = { id: 1, ...createAuthorDto };
      mockAuthorsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createAuthorDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const expectedResult = [
        { id: 1, name: 'Author 1' },
        { id: 2, name: 'Author 2' },
      ];
      mockAuthorsService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      const id = '1';
      const expectedResult = { id: 1, name: 'Test Author' };
      mockAuthorsService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const id = '1';
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Updated Author',
      };
      const expectedResult = { id: 1, ...updateAuthorDto };
      mockAuthorsService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateAuthorDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateAuthorDto);
    });
  });

  describe('remove', () => {
    it('should remove an author', async () => {
      const id = '1';
      const expectedResult = { id: 1, name: 'Deleted Author' };
      mockAuthorsService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
