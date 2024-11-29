import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
