import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
