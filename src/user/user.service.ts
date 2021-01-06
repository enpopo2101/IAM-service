import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }
  async getListUser() {
    return await this.userModel.find().lean().exec();
  }
}
