import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from './tag.entity'

@Module({
  providers: [TagService],
  controllers: [TagController],
  imports: [TypeOrmModule.forFeature([Tag])],
  exports: [TagService]
})
export class TagModule {}
