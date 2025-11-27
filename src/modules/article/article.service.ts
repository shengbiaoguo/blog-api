import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from './article.entity'
import { Repository } from 'typeorm'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'
import { CreateArticleDto } from './dto/create.article.dto'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  async getAll(dto: PaginationDto) {
    const { page, perPage } = dto
    const skip = (page - 1) * perPage
    const [data, total] = await this.articleRepository.findAndCount({
      skip,
      take: perPage,
      select: ['id', 'title', 'createdAt']
    })
    return {
      documents: data,
      total: total,
      page,
      perPage,
      totalPage: total && (Math.ceil(total / perPage) || 1)
    } as PaginateResult<Article>
  }

  async create(dto: CreateArticleDto, userId: number) {
    const article = new Article()
    article.title = dto.title

    const existFlag = await this.articleRepository.findOneBy({ title: article.title })
    if (existFlag) {
      throw new BadRequestException('The article title already exists.')
    }

    return await this.articleRepository.save(article)
  }
}
