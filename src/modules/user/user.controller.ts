import { SuccessResponse } from '@app/decorators/success-response.decorator'
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create.user.dto'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'
import { UserItemRO, UserRO } from './interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @SuccessResponse({ message: 'Get user succeeded', usePaginate: true })
  getAll(@Query() dto: PaginationDto): Promise<PaginateResult<UserItemRO>> {
    return this.userService.getAll(dto)
  }

  @Post('create')
  @SuccessResponse('Create user succeeded')
  createUser(@Body() dto: CreateUserDto): Promise<UserRO> {
    return this.userService.create(dto)
  }
}
