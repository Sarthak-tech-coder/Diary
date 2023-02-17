import express from 'express';
import * as path from 'path';
import * as Dotenv from "dotenv"
import mongoose from "mongoose"
import { UserRouter } from "./router/User"
import { MFARouter } from './router/MFA';
import bodyParser = require('body-parser');
Dotenv.config()
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json())
app.use(bodyParser.json())

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use("/MFAPI", MFARouter)
app.use("/UserAPI", UserRouter)

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log("\x1b[32m", "\x1b[1m", `Listening at http://localhost:${port}/api, connected successfully to database`);
  }).on('error', console.error);
}).catch(() => {
  console.log("Connection failed, server terminated")
})
