const mongoose = require('mongoose');
// Create a model to define data storage properties
// using mongoose validators and schemas
const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    // timestamp
    type: Number,
    default: null
  }
});

module.exports = {Todo};
