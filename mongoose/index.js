import bootstrap from "./src/app.controller.js";
import express from "express";
import bodyParser from "body-parser";
//import mongoose from "mongoose";

const app = express();
const port = 3000;
app.use(express.json());
bootstrap(app, express);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
