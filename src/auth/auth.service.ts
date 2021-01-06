import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { UserDocument, User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import configuration from '../config/configuration';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async login(data: AuthDto): Promise<string> {
    const user = await this.userModel.findOne(
      {
        username: data.username,
      },
      {},
    );
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User is not exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const isCorrectPassword = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Password is wrong',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return this.generateToken(user);
  }
  generateToken(user: UserDocument) {
    const payload = { username: user.username, name: user.name, _id: user._id };
    const token = this.jwtService.sign(payload);
    return token;
  }
  async register(data: AuthDto): Promise<UserDocument> {
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
