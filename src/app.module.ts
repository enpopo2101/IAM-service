import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    MongooseModule.forRoot(configuration.mongo),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
