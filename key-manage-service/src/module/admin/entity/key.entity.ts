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
  rateLimit: string;

  @Prop({ required: true })
  expiration: Date;
 
  // @Prop({ required: true })
  // issuedDate: Date;
 
  @Prop({ required: true })
  isActive: boolean;
  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignedTo: { type: Types.ObjectId; ref: 'User' };
}
export const KeySchema = SchemaFactory.createForClass(Key);
