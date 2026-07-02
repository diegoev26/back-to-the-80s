import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";

import config from "./config/config.js";
import testRoutes from "./routes/test.routes.js";

const app = express(),
  __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static(__dirname + "/public"));

app.use("/api", testRoutes);

app.set("port", config.options?.port);
app.listen(app.get("port"), (err) =>
  err ? console.error(err) : console.log(app.get("port")),
);
