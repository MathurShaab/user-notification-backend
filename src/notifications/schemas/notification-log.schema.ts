
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationLogDocument = NotificationLog & Document;

@Schema()
export class NotificationLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  channel: 'email' | 'sms' | 'push';

  @Prop({ default: 'pending' })
  status: 'pending' | 'sent' | 'failed';

  @Prop()
  sentAt: Date;

  @Prop()
  failureReason: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationLogSchema = SchemaFactory.createForClass(NotificationLog);
