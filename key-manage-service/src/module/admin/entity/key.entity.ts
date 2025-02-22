import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { User } from './user.entity';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Key {
  @Prop({ required: true, maxlength: 100,unique:true })
  key: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  rateLimit: number;

  @Prop({ required: true })
  expiration: Date;
  
  @Prop({ required: true })
  isActive: boolean;
  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignedTo: { type: Types.ObjectId; ref: 'User' };

  // Prop({ required: true, unique: true })
  // key: string;

  // @Prop({ required: true })
  // userId: string;

  // @Prop({ required: true })
  // rateLimit: number; // number of requests per minute

  // @Prop({ required: true })
  // expirationTime: Date;

  // @Prop({ default: false })
  // disabled: boolean;

}
export const KeySchema = SchemaFactory.createForClass(Key);
