import express from "express";
import cors from "cors";
import router from "./routes.js";
import { con } from "./database.js";
import {ErrorMiddleware} from "./error/error.js"
const app = express();
const port= process.env.PORT || 3001;
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("upload/images"));
con("ecom");
app.use(router);
app.use(ErrorMiddleware)

app.listen(port);
