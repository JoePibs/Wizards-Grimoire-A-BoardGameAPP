import { IsString, Length, IsNotEmpty } from 'class-validator';

export class UpdateMechanicDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
