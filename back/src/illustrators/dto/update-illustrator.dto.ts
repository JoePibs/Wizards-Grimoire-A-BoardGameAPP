import { IsString, Length, IsNotEmpty } from 'class-validator';

export class UpdateIllustratorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
