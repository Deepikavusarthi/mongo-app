const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resourceRouter = require("./routes/resource");
const costumesRouter = require("./routes/costumes");

mongoose.connect(process.env.MONGO_CON);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB Atlas");
});

app.get("/", function(req, res) {
  res.send("Mongo App is running");
});

app.use("/resource", resourceRouter);
app.use("/costumes", costumesRouter);

app.listen(3000, function () {
  console.log("Server running on port 3000");
});