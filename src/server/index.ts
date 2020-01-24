import express = require("express");
import mongoose from "mongoose";
import { clickDataRouter, productStatisticsRouter } from "./routes";
import Observer from "./services/Observer";

const app = express();
app.use(express.json());

// setup database
const db = require("./config/keys").mongoProdURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`Mongodb Connected`))
  .catch(error => console.log(error));

// debug mode on
mongoose.set("debug", true);

// setup file watcher service
const observer = new Observer();
observer.watchFile("./data");

// setup routes
app.use("/api/clicks", clickDataRouter);
app.use("/api/productstatistics", productStatisticsRouter);

// startup app
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
