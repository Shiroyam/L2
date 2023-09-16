import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import { router } from "./router.js";

const PORT = 3004;
const app = express();

const option = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors(option))
app.use(bodyParser.json());
app.use("/api", router)

app.listen(PORT, () => {
  try {
    console.log(`Server: http://localhost:${PORT}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
});