import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly content: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tagIds: string[] = []
}
