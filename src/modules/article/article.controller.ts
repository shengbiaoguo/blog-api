import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ArticleService } from './article.service'
import { SuccessResponse } from '@app/decorators/success-response.decorator'
import { Article } from './article.entity'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'
import { CreateArticleDto } from './dto/create.article.dto'
import { JwtAuthGuard } from '@app/core/auth/jwt-auth.guard'
import { GetCurrentUser } from '@app/decorators/get-user.decorator'

@Controller('article')
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  @SuccessResponse({ message: 'Get article succeeded', usePaginate: true })
  getAll(@Query() dto: PaginationDto): Promise<PaginateResult<Article>> {
    return this.articleService.getAll(dto)
  }

  @Post('create')
  @SuccessResponse('Create article succeeded')
  createUser(@GetCurrentUser('id') userId: number, @Body() dto: CreateArticleDto) {
    return this.articleService.create(dto, userId)
  }
}
