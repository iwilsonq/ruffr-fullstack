const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  imageName: {
    type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Images', imageSchema);
