const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const Account = require("./models/account");

// ROUTERS
const indexRouter = require("./routes/index");
const resourceRouter = require("./routes/resource");
const costumesRouter = require("./routes/costumes");

dotenv.config();

const app = express();

// ======================
// Passport configuration
// ======================
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// ======================
// Views setup
// ======================
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// ======================
// Middleware
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Make user available in all views
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// ======================
// Static files
// ======================
app.use(express.static("public"));

// ======================
// MongoDB connection
// ======================
mongoose.connect(process.env.MONGO_CON);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB Atlas");
});

// ======================
// Use routes
// ======================
app.use("/", indexRouter);        // handles /, /login, /register, /logout, /ping
app.use("/resource", resourceRouter);
app.use("/costumes", costumesRouter);

// ======================
// Server
// ======================
app.listen(3000, function () {
  console.log("Server running on port 3000");
});