import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from '../config/constants';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ enum: Object.values(Roles) }], default: [Roles.USER] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
