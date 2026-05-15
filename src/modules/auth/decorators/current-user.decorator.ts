import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from '../types/authenticated-user.type';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedUser | undefined =>
    context.switchToHttp().getRequest<Request>().user as
      | AuthenticatedUser
      | undefined,
);
