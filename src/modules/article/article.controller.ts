import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import { SuccessResponse } from '@app/decorators/success-response.decorator'
import { Article } from './article.entity'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'
import { CreateArticleDto } from './dto/create.article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  @SuccessResponse({ message: 'Get article succeeded', usePaginate: true })
  getAll(@Query() dto: PaginationDto): Promise<PaginateResult<Article>> {
    return this.articleService.getAll(dto)
  }

  @Post('create')
  @SuccessResponse('Create article succeeded')
  createUser(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto)
  }
}
