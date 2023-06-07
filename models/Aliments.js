const mongoose = require('mongoose')
const { Schema } = mongoose

const alimentSchema = new Schema({
  name:String,
  calories:Number,
  lipids:Number,
  carbohydrate:Number,
  proteins:Number
});

module.exports = mongoose.model('Aliment', alimentSchema)