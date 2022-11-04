const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const router = require("./routes/api");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = serverConfig.PORT;

mongoose.connect(
  dbConfig.DB_URL,
  () => {
    console.log("Connected to MongoDB");
  },
  (err) => {
    console.log("Error connecting to MongoDB ", err);
  }
);

app.use("/api", router);

require("./crons/cronjob");

app.listen(port, () => {
  console.log(`Application has been started on port: ${port}`);
});
