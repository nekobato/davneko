import { registerAs } from '@nestjs/config';

const appConfig = registerAs(
  'app',
  (): Record<string, any> => ({
    env: process.env.APP_ENV || 'development',
  }),
);

export default [appConfig];
