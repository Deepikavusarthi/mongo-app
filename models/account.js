const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const AccountSchema = new mongoose.Schema({
  username: String
});

AccountSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model("Account", AccountSchema);