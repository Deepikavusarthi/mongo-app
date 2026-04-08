const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Costume = require("./models/costume");
const resourceRouter = require("./routes/resource");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// seed database
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
    cost: 22.0
  });

  let instance3 = new Costume({
    costume_type: "vampire",
    size: "small",
    cost: 18.5
  });

  instance1.save()
    .then(() => {
      console.log("First object saved");
    })
    .catch((err) => {
      console.error(err);
    });

  instance2.save()
    .then(() => {
      console.log("Second object saved");
    })
    .catch((err) => {
      console.error(err);
    });

  instance3.save()
    .then(() => {
      console.log("Third object saved");
    })
    .catch((err) => {
      console.error(err);
    });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

app.get("/", (req, res) => {
  res.send("🚀 Mongo App is running");
});

app.use('/resource', resourceRouter);

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});