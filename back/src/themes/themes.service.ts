/// Theme.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Theme } from './theme.model';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(Theme)
    private themeModel: typeof Theme,
  ) {}

  async create(createThemeDto: CreateThemeDto): Promise<Theme> {
    const { name } = createThemeDto;
    return this.themeModel.create({ name } as Theme);
  }

  async findOne(id: number): Promise<Theme> {
    const theme = await this.themeModel.findByPk(id);
    if (!theme) {
      throw new NotFoundException(`Theme with id ${id} not found`);
    }
    return theme;
  }
  async findAll(): Promise<Theme[]> {
    return this.themeModel.findAll();
  }

  async update(
    id: number,
    updateThemeDto: UpdateThemeDto,
  ): Promise<[number, Theme[]]> {
    const theme = await this.themeModel.findByPk(id);
    if (!theme) {
      throw new NotFoundException(`Theme with ID ${id} not found`);
    }
    await theme.update(updateThemeDto);
    return [1, [theme]];
  }

  // Supprimer un illustrateur par ID
  async remove(id: number): Promise<void> {
    const theme = await this.findOne(id);
    if (theme) {
      await theme.destroy();
    }
  }
}
