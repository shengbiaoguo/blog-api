import { JwtAuthGuard } from '@app/core/auth/jwt-auth.guard'
import { Controller, UseGuards } from '@nestjs/common'

@Controller('comment')
@UseGuards(JwtAuthGuard)
export class CommentController {}
