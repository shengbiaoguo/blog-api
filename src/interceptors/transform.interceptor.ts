// Response data transform interceptor

import { map } from 'rxjs/operators'
import type { Observable } from 'rxjs'
import type { FastifyReply } from 'fastify'
import type { CallHandler, ExecutionContext } from '@nestjs/common'
import { Injectable, NestInterceptor } from '@nestjs/common'
import { HttpSuccessResponse, ResponseStatus } from '@app/interfaces/response.interface'
import { getSuccessResponseOptions } from '@app/decorators/success-response.decorator'

// transform `T` to `HttpResponseSuccess<T>` when controller `Promise` resolved
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, T | HttpSuccessResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T | HttpSuccessResponse<T>> {
    const reponseOptions = getSuccessResponseOptions(context.getHandler())
    if (!reponseOptions.useTransform) {
      return next.handle()
    }

    const response = context.switchToHttp().getResponse<FastifyReply>()

    return next.handle().pipe(
      map((data: any) => {
        if (reponseOptions.status) {
          response.status(reponseOptions.status)
        }

        const responseBody: HttpSuccessResponse<T> = {
          status: ResponseStatus.Success,
          message: reponseOptions.message ?? 'Success',
          result: !reponseOptions.usePaginate
            ? data
            : {
                data: data.documents,
                pagination: {
                  total: data.total,
                  current_page: data.page,
                  per_page: data.perPage,
                  total_page: data.totalPage
                }
              }
        }

        return responseBody
      })
    )
  }
}
