import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AuthAttempt,
  AuthAttemptDocument,
} from '../../database/schemas/auth-attempts/auth-attempt.schema';
import { AbstractRepository } from '../../core/repositories/abstract.repository';

@Injectable()
export class AuthAttemptsRepository extends AbstractRepository<AuthAttemptDocument> {
  constructor(
    @InjectModel(AuthAttempt.name)
    authAttemptModel: Model<AuthAttemptDocument>,
  ) {
    super(authAttemptModel);
  }
}
