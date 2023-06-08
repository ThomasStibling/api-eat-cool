const mongoose = require('mongoose')
const { Schema } = mongoose

const planningSchema = new Schema({
  date:Date,
  typeOfMeal: String,
  user: String,
  aliment: String,
});

module.exports = mongoose.model('Planning', planningSchema)