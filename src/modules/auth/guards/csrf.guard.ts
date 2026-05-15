import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      return true;
    }

    const cookieToken = request.cookies?.csrfToken as string | undefined;
    const headerToken = request.header('X-CSRF-Token');

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      throw new ForbiddenException('CSRF token không hợp lệ');
    }

    return true;
  }
}
