import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateIllustratorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
