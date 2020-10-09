import "dotenv/config";
import "./database/connection";

import express from "express";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use("/api", routes);

export default app;