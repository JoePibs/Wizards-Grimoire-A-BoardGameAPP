import { IsString, Length, IsNotEmpty } from 'class-validator';

export class UpdateThemeDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
