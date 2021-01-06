import 'dotenv/config';
const configuration = {
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo: process.env.MONGODB_URL,
  saltOrRounds: Number(process.env.SALT_OR_ROUNDS) || 10,
  auth: {
    secretKey: process.env.SECRET_KEY,
    expiresIn: '120s',
  },
};

export default configuration;
