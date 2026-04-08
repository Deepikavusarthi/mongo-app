const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB Atlas");
});

const Costume = require("./models/costume");
const resourceRouter = require("./routes/resource");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function recreateDB() {
  await Costume.deleteMany();

  let instance1 = new Costume({
    costume_type: "ghost",
    size: "large",
    cost: 15.4
  });

  let instance2 = new Costume({
    costume_type: "witch",
    size: "medium",
    cost: 22
  });

  let instance3 = new Costume({
    costume_type: "vampire",
    size: "small",
    cost: 18.5
  });

  await instance1.save();
  console.log("First object saved");

  await instance2.save();
  console.log("Second object saved");

  await instance3.save();
  console.log("Third object saved");
}

let reseed = false;
if (reseed) {
  recreateDB();
}

app.get("/", (req, res) => {
  res.send("🚀 Mongo App is running");
});

app.use("/resource", resourceRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});