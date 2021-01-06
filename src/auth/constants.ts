import { JwtSignOptions } from '@nestjs/jwt';
import configuration from 'src/config/configuration';

export const jwtConstants: JwtSignOptions = {
  secret: configuration.auth.secretKey,
  expiresIn: configuration.auth.expiresIn,
};
