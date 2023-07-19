import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface AuthenticatedUser {
  sub: string;
  token: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
