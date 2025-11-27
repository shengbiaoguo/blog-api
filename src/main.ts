import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpExceptionFilter } from './filters/exception.filter'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule)
  const adapter = new FastifyAdapter({ logger: false, trustProxy: true })
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter)

  const configService = app.get(ConfigService)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 必须开启，让 class-transformer 实例化 DTO 并应用默认值
      whitelist: true // 推荐：确保请求中未定义的属性不会进入 DTO
    })
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(configService.get<number>('APP_PORT', 3000))

  // TODO 报错发送邮件 try catch
}

bootstrap()
