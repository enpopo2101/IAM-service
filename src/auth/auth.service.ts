import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { UserDocument, User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import configuration from '../config/configuration';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async login(data: AuthDto): Promise<User> {
    const result = this.userModel.findOne({
      username: data.username,
      password: data.password,
    });
    return result;
  }

  async register(data: AuthDto): Promise<User> {
    const passwordEncrypted = await bcrypt.hash(
      data.password,
      configuration.saltOrRounds,
    );
    const user = new this.userModel({
      username: data.username,
      password: passwordEncrypted,
      name: data.name,
    });
    return await user.save();
  }
}
