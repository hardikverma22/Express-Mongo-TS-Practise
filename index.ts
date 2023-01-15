import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';
import { connectToDB, CallbackFunc } from "./db"
import { router } from "./routers/bookRouter"


dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(express.json())
app.use(router);

const CallbackFunction: CallbackFunc = (err: Error | null) => {
  if (err == null) {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  }
  else {
    console.error("Database connection failed");
    process.exit();
  }
}

connectToDB(CallbackFunction);




