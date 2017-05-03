const mongoose = require('mongoose');
// application root
// mongoose supports callback by default, however config to use es6 promise
mongoose.Promise = global.Promise;

// connect to db
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Create model to define data storage properties
const Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    // timestamp
    type: Number
  }
});

// create new Todo instance
// const newTodo = new Todo({
//   text: 'Cook Dinner'
// });
//
// // save() returns promise
// newTodo.save().then((result) => {
//   console.log(`Result: ${result}`);
// }, (err) => {
//   console.log(`Error: ${err}`);
// });

const newTodo2 = new Todo({
  text: 'Create another todo with mongoose',
  completed: false,
  completedAt: 20170320
});

newTodo2.save().then((result) => {
  console.log(`Result: ${JSON.stringify(result, undefined, 2)}`);
}, (err) => {
  console.log(`Error: ${err}`);
});
