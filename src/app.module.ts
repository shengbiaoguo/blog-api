import { Module } from '@nestjs/common'
import { DatabaseModule } from '@app/core/databse/database.module'
import { PhotoModule } from './modules/photo/photo.module'

@Module({
  imports: [DatabaseModule, PhotoModule],
  controllers: [],
  providers: []
})
export class AppModule {}
