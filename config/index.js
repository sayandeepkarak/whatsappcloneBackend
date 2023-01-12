import { config } from "dotenv";

config();

export const {
  APP_PORT,
  DATABASE_URL,
  EMAIL_SERVICE_USERNAME,
  EMAIL_SERVICE_KEY,
  SECRET_KEY,
} = process.env;
