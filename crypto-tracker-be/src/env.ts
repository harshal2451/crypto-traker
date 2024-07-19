
import * as dotenv from 'dotenv';

dotenv.config();



export interface SetUpEnv {
  PORT: string,
  NODE_ENV: string,
  MONGO_URI: string,
  FE_URL: string,
  CRYPTO_URL: string,
  CRYPTO_API_KEY: string
}

export const getEnv = (): SetUpEnv => {
  return {
    PORT: process.env.PORT ?? '3000',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    MONGO_URI: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/crypto-tracker',
    FE_URL: process.env.FE_URL ?? 'http://localhost:3001',
    CRYPTO_URL: process.env.CRYPTO_URL ?? 'https://api.livecoinwatch.com/coins/list',
    CRYPTO_API_KEY: process.env.CRYPTO_API_KEY ?? 'bdf05ba5-4da9-4a39-8e00-1a0e6f1c59bf'
  }
}
