import { User } from '@app/modules/user/user.entity'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJWT(user: User) {
    const payload = {
      sub: user.id,
      username: user.username
    }

    return this.jwtService.sign(payload, {
      expiresIn: '1d' // access token 有效期
    })
  }
}
