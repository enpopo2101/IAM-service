import { Types } from 'mongoose';

export class CreateToolDto {
  title: string;
  price: number;
  code: string;
  description: string;
  createdBy: Types.ObjectId;
}
