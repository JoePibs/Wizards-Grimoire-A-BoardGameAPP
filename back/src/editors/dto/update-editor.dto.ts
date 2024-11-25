import { IsString, Length, IsNotEmpty } from 'class-validator';

export class UpdateEditorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
