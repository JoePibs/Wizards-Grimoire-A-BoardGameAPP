import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Editor } from './editor.model';
import { CreateEditorDto } from './dto/create-editor.dto';
import { UpdateEditorDto } from './dto/update-editor.dto';

@Injectable()
export class EditorsService {
  constructor(
    @InjectModel(Editor)
    private editorModel: typeof Editor,
  ) {}

  // Création d'un illustrateur
  async create(createEditorDto: CreateEditorDto): Promise<Editor> {
    const { name } = createEditorDto;
    return this.editorModel.create({ name } as Editor);
  }

  // Trouver un illustrateur par ID
  async findOne(id: number): Promise<Editor> {
    const editor = await this.editorModel.findByPk(id);
    if (!editor) {
      throw new NotFoundException(`Editor with id ${id} not found`);
    }
    return editor;
  }

  async findOneByName(name: string): Promise<Editor> {
    const editor = await this.editorModel.findOne({
      where: { name }, 
    });
    if (!editor) {
      throw new NotFoundException(`Editor with name ${name} not found`);
    }
    return editor;
  }


  async findAll(): Promise<Editor[]> {
    return this.editorModel.findAll();
  }

  async update(
    id: number,
    updateEditorDto: UpdateEditorDto,
  ): Promise<[number, Editor[]]> {
    const editor = await this.editorModel.findByPk(id);
    if (!editor) {
      throw new NotFoundException(`Editor with ID ${id} not found`);
    }
    await editor.update(updateEditorDto);
    return [1, [editor]];
  }

  // Supprimer un illustrateur par ID
  async remove(id: number): Promise<void> {
    const editor = await this.findOne(id);
    if (editor) {
      await editor.destroy();
    }
  }
}
