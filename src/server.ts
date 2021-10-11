import { createConnection } from 'typeorm';
import dbConfig from "./config/database.config"
import * as dotenv from 'dotenv';
import {app} from './app';


process.on('uncaughtException', (err) => {
  console.log('Uncought exception! Shutting down ...');
  console.log(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
let server: any;
createConnection(dbConfig)
  .then((_connection) => {
    server = app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
    console.log('Connection to DB is established');
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message);
  console.log('Undhandled rejection ! Shut down ...');
  server.close(() => {
    process.exit(1);
  });
});