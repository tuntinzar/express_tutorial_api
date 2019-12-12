const express = require("express");
const app = express();

const fashion_route = require("./fashions/route/fashion_route.js");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb://root:root123@ds061747.mlab.com:61747/fashion_shop",
  () => {
    console.log("database is connected");
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use("/fashions", fashion_route);

app.listen("5000", () => {
  console.log("API are running");
});
