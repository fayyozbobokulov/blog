import { ConnectionOptions } from "typeorm";
import { User, Post } from "../models/index";


const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "qwert12345",
  database: process.env.POSTGRES_DB || "blog",
  entities: [User, Post],
  // synchronize: true,
};

export default config;