import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  // 返回 req.user 对象，或如果指定了 data，则返回 req.user[data]
  return data ? request.user[data as string] : request.user
})
