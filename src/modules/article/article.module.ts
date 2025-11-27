import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './article.entity'

@Module({
  providers: [ArticleService],
  controllers: [ArticleController],
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [ArticleService]
})
export class ArticleModule {}
