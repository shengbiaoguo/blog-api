import { Injectable } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { User } from '@app/modules/user/user.entity'
import { Tag } from '@app/modules/tag/tag.entity'
import { Article } from '@app/modules/article/article.entity'
import { Comment } from '@app/modules/comment/comment.entity'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASS'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [User, Article, Comment, Tag],
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE', false)
    }
  }
}
