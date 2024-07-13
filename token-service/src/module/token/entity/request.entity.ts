import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RequestLog extends Document {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ default: false })
  successful: boolean;
}

export const RequestLogSchema = SchemaFactory.createForClass(RequestLog);
