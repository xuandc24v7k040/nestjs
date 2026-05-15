import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const isCallback = request.path.endsWith('/google/callback');
    const state = isCallback
      ? (request.query.state as string | undefined)
      : this.authService.createOauthState(response);

    return {
      scope: ['email', 'profile'],
      state,
    };
  }
}
