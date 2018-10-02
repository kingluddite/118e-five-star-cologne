const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CologneSchema = new Schema({
  scentName: {
    type: String,
    required: true,
  },
  scentPrice: {
    type: Number,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },
});

module.exports = mongoose.model('Cologne', CologneSchema);
