import { FastifyReply } from 'fastify'
import type { ArgumentsHost } from '@nestjs/common'
import { ExceptionFilter, Catch, HttpStatus, HttpException } from '@nestjs/common'
import { ResponseStatus, HttpErrorResponse } from '@app/interfaces/response.interface'

type ExceptionResponse =
  | string
  | {
      message: string
      error?: any
    }

// catch globally exceptions & formatting error message to <HttpErrorResponse>
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp()
    const response = context.getResponse<FastifyReply>()
    const timestamp = new Date().toISOString()

    if (exception instanceof HttpException) {
      const errorInfo = exception.getResponse() as ExceptionResponse
      response.code(exception.getStatus()).send({
        status: ResponseStatus.Error,
        message: typeof errorInfo === 'string' ? errorInfo : errorInfo.message,
        error: typeof errorInfo === 'string' ? null : errorInfo.error,
        timestamp
      } as HttpErrorResponse)
    } else {
      response.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: ResponseStatus.Error,
        message: exception instanceof Error ? exception.message : String(exception),
        error: 'Internal Server Error',
        timestamp
      } as HttpErrorResponse)
    }
  }
}
