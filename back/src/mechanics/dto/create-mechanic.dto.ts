import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateMechanicDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
