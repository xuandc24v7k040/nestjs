import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

export interface GoogleProfile {
  googleId: string;
  email: string;
  fullName: string;
  emailVerified: boolean;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): GoogleProfile {
    const email = profile.emails?.[0]?.value;
    const emailVerified = Boolean(
      (profile._json as Record<string, unknown>).email_verified,
    );

    return {
      googleId: profile.id,
      email: email ?? '',
      fullName: profile.displayName,
      emailVerified,
    };
  }
}
