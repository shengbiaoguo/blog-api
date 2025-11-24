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
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, { logger: false })

  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(configService.get<number>('APP_PORT', 3000))

  // TODO 报错发送邮件 try catch
}

bootstrap()
