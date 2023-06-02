import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  pages: number;

  @IsDefined()
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CreateAuthorDto)
  authors: CreateAuthorDto[];
}
