import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EditorsService } from './editors.service';
import { Editor } from './editor.model';
import { EditorsController } from './editors.controller';

@Module({
  imports: [SequelizeModule.forFeature([Editor])],
  providers: [EditorsService],
  controllers: [EditorsController],
  exports: [EditorsService],
})
export class EditorsModule {}
