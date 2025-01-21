import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
