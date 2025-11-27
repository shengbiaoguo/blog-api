import { unknownToNumber } from '@app/transformers/value.transformer'
import { Transform } from 'class-transformer'
import { IsOptional, IsInt, Min } from 'class-validator'

export interface PaginateResult<T> {
  documents: Array<T>
  total: number
  page: number
  perPage: number
  totalPage: number
}

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => unknownToNumber(value))
  page: number = 1 // 默认第一页

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => unknownToNumber(value))
  perPage: number = 10 // 默认每页10条
}
