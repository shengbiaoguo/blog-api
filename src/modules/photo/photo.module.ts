import { Module } from '@nestjs/common'
import { PhotoService } from './photo.service'
import { PhotoProvider } from './photo.entity'
import { PhotoController } from './photo.controller'

@Module({
  controllers: [PhotoController],
  providers: [PhotoProvider, PhotoService],
  exports: [PhotoService]
})
export class PhotoModule {}
