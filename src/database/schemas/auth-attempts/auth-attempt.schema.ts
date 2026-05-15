import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthAttemptDocument = HydratedDocument<AuthAttempt>;

@Schema({
  collection: 'auth_attempts',
  timestamps: true,
})
export class AuthAttempt {
  @Prop({ enum: ['email', 'ip'], required: true })
  type!: 'email' | 'ip';

  @Prop({ required: true, trim: true, lowercase: true })
  key!: string;

  @Prop({ default: 0 })
  attempts!: number;

  @Prop({ required: true })
  windowStartedAt!: Date;

  @Prop({ type: Date, default: null })
  blockedUntil?: Date | null;
}

export const AuthAttemptSchema = SchemaFactory.createForClass(AuthAttempt);
AuthAttemptSchema.index({ type: 1, key: 1 }, { unique: true });
