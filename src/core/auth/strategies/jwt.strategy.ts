import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { CurrentUser } from '@app/interfaces/user.interface'

interface JwtPayload {
  sub: number
  username: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // 从请求头 Authorization: Bearer <token> 中提取 JWT
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 获取 JWT 密钥
      secretOrKey: configService.get<string>('JWT_SECRET')
    })
  }

  // 关键方法：Token 校验成功后执行
  async validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username } as CurrentUser
  }
}
