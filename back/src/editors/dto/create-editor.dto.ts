import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateEditorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
