import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DBModule } from '@app/core/db/db.module'
import { CacheModule } from '@app/core/cache/cache.module'
import { UserModule } from '@app/modules/user/user.module'
import { ArticleModule } from '@app/modules/article/article.module'
import { CommentModule } from '@app/modules/comment/comment.module'
import { TagModule } from '@app/modules/tag/tag.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
    CacheModule,
    UserModule,
    ArticleModule,
    CommentModule,
    TagModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
