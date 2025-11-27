import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { TagService } from './tag.service'
import { SuccessResponse } from '@app/decorators/success-response.decorator'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'
import { Tag } from './tag.entity'
import { CreateTagDto } from './dto/create.tag.dto'

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('list')
  @SuccessResponse({ message: 'Get tag succeeded', usePaginate: true })
  getAll(@Query() dto: PaginationDto): Promise<PaginateResult<Tag>> {
    return this.tagService.getAll(dto)
  }

  @Post('create')
  @SuccessResponse('Create tag succeeded')
  createUser(@Body() dto: CreateTagDto) {
    return this.tagService.create(dto)
  }
}
