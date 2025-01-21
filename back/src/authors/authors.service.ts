import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './author.model';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author)
    private authorModel: typeof Author,
  ) {}

  // Création d'un illustrateur
  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { name } = createAuthorDto;
    return this.authorModel.create({ name } as Author);
  }

  // Trouver un illustrateur par ID
  async findOne(id: number): Promise<Author> {
    const author = await this.authorModel.findByPk(id);
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }
  async findAll(): Promise<Author[]> {
    return this.authorModel.findAll();
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<[number, Author[]]> {
    const author = await this.authorModel.findByPk(id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    await author.update(updateAuthorDto);
    return [1, [author]];
  }

  // Supprimer un illustrateur par ID
  async remove(id: number): Promise<void> {
    const author = await this.findOne(id);
    if (author) {
      await author.destroy();
    }
  }
}
