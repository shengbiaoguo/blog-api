import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DBModule } from '@app/core/db/db.module'
import { PhotoModule } from './modules/photo/photo.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DBModule, PhotoModule],
  controllers: [],
  providers: []
})
export class AppModule {}
