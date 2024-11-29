import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EditorsService } from './editors.service';
import { CreateEditorDto } from './dto/create-editor.dto';
import { UpdateEditorDto } from './dto/update-editor.dto';

@Controller('editors')
export class EditorsController {
  constructor(private readonly editorsService: EditorsService) {}

  @Post()
  create(@Body() createEditorDto: CreateEditorDto) {
    return this.editorsService.create(createEditorDto);
  }

  @Get()
  findAll() {
    return this.editorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEditorDto: UpdateEditorDto) {
    return this.editorsService.update(+id, updateEditorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorsService.remove(+id);
  }
}
