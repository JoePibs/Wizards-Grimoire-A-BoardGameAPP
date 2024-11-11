import { IsString, IsNotEmpty } from 'class-validator';

export class CreateIllustratorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
