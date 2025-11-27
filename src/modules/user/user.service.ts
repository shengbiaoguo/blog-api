import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create.user.dto'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAll(dto: PaginationDto) {
    const { page, perPage } = dto
    const skip = (page - 1) * perPage
    const [data, total] = await this.userRepository.findAndCount({
      skip,
      take: perPage,
      select: ['id', 'username']
    })
    return {
      documents: data,
      total: total,
      page,
      perPage,
      totalPage: total && (Math.ceil(total / perPage) || 1)
    } as PaginateResult<User>
  }

  async create(dto: CreateUserDto) {
    const user = new User()
    user.username = dto.username
    user.passwordHash = dto.password

    const existFlag = await this.userRepository.findOneBy({ username: user.username })
    if (existFlag) {
      throw new BadRequestException('The username already exists.')
    }

    return await this.userRepository.save(user)
  }
}
