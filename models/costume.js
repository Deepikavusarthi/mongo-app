var mongoose = require('mongoose')

const costumeSchema = mongoose.Schema({
  costume_type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true,
    min: 1,
    max: 50
  },
  cost: {
    type: Number,
    required: true,
    min: 1,
    max: 1000
  }
})

module.exports = mongoose.model("Costume", costumeSchema)