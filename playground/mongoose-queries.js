const {ObjectID} = require('mongodb');
// import mongoose.js and todo.js
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '5919c7835b1c4842280ef099a';
//
// if (!ObjectID.isValid()) {
//   console.log(`Id not valid: ${id}`);
// }
// With Mongoose, there is no need to pass id string thru an ObjectId() method
// return empty array if not found
// Todo.find({
//   _id: id
// }).then((result) => {
//   console.log(`Result: ${result}`);
// });
//
// // returns null if not found
// Todo.findOne();

// return null if not found
// Todo.findById(id).then((result) => {
//   if (!result) {
//     return console.log('Id not found');
//   }
//
//   console.log(`Todo.findById: ${result}`);
// }).catch((e) => {
//   console.log(`Error: ${e}`);
// });

// Challenge query users collection and handle errors, user not found and user found
const id = '5919c7835b1c4842280ef08a11';
if (!ObjectID.isValid(id)) {
  console.log(`Id not valid: ${id}`);
}
// Todo.find({
//   _id: id
// }).then((result) => {
//   console.log(`Result: ${result}`);
// });

// Todo.findOne({
//   _id: id
// }).then((result) => {
//   console.log(`Result: ${result}`);
// });

Todo.findById(id).then((result) => {
  if (!result) {
    console.log(`Not found! ObjectID: ${id}`);
  }
  console.log(`Result: ${result}`);
}).catch((e) => {
  console.log(`Provide a valid ID. Input: ${id}`);
});
