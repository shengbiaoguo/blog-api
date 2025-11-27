import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tag } from './tag.entity'
import { Repository } from 'typeorm'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'
import { CreateTagDto } from './dto/create.tag.dto'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async getAll(dto: PaginationDto) {
    const { page, perPage } = dto
    const skip = (page - 1) * perPage
    const [data, total] = await this.tagRepository.findAndCount({
      skip,
      take: perPage,
      select: ['id', 'name']
    })
    return {
      documents: data,
      total: total,
      page,
      perPage,
      totalPage: total && (Math.ceil(total / perPage) || 1)
    } as PaginateResult<Tag>
  }

  async create(dto: CreateTagDto) {
    const tag = new Tag()
    tag.name = dto.name

    const existFlag = await this.tagRepository.findOneBy({ name: tag.name })
    if (existFlag) {
      throw new BadRequestException('The tagname already exists.')
    }

    return await this.tagRepository.save(tag)
  }
}
