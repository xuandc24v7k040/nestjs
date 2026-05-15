import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: configurations,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 100,
      },
    ]),
    DatabaseModule,
    HealthModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
