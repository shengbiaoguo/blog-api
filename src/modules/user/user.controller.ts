import { SuccessResponse } from '@app/decorators/success-response.decorator'
import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create.user.dto'
import { PaginateResult, PaginationDto } from '@app/interfaces/paginate.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @SuccessResponse({ message: 'Get user succeeded', usePaginate: true })
  getAll(@Query() dto: PaginationDto): Promise<PaginateResult<User>> {
    return this.userService.getAll(dto)
  }

  @Post('create')
  @SuccessResponse('Create user succeeded')
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }
}
