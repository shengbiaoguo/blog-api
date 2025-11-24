import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmConfigService } from './db.service'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 确保 ConfigModule 可用
      useClass: TypeOrmConfigService // 使用自定义的配置服务类
    })
  ]
  // 不需要 providers 和 exports，它只是用来配置 TypeOrmModule
})
export class DBModule {}
