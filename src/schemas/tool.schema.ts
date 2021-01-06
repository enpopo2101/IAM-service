import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
export type ToolDocument = Tool & Document;

@Schema()
export class Tool {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, minlength: 10 })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  createdBy: User;
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
