import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create.user.dto'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'
import { UserItemRO, UserRO } from './interface'
import { AuthService } from '@app/core/auth/auth.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  async getAll(dto: PaginationDto) {
    const { page, perPage } = dto
    const skip = (page - 1) * perPage
    const [data, total] = await this.userRepository.findAndCount({
      skip,
      take: perPage,
      select: ['id', 'username', 'createdAt']
    })

    const listData = data.map((i) => ({ id: i.id, username: i.username, createdAt: i.createdAt }) as UserItemRO)
    return {
      documents: listData,
      total: total,
      page,
      perPage,
      totalPage: total && (Math.ceil(total / perPage) || 1)
    } as PaginateResult<UserItemRO>
  }

  async create(dto: CreateUserDto) {
    const user = new User()
    user.username = dto.username
    user.passwordHash = dto.password

    const existFlag = await this.userRepository.findOneBy({ username: user.username })
    if (existFlag) {
      throw new BadRequestException('The username already exists')
    }

    const newUser = await this.userRepository.save(user)
    return this.buildUserRO(newUser)
  }

  private async buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      username: user.username,
      token: await this.authService.generateJWT(user)
    } as UserRO

    return userRO
  }
}
