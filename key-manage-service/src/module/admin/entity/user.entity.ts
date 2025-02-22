import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '../../../helpers/enums';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
