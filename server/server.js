// application root
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const PORT = 3000;
// only Express route handlers in server.js file
const app = express();

app.use(bodyParser.json());

// POST
app.post('/todos', (req, res) => {
  // the post body gets stored on the request obj by the bodyParser
  // create the todo obj from client post request
  const newTodo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  newTodo.save()
    .then((result) => {
      // send document obj back to client in response
      res.send(result);
      console.log(JSON.stringify(result, undefined, 2));
    }, (error) => {
      // send HTTP status 400: "Bad request" back to client
      console.log(`Error: ${error}`);
      res.status(400).send(error);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// GET

// instances of obj models for testing

// const newUser = new User({
//   email: 'preston.aronson@gmail.com'
// });

// newUser.save()
//   .then((result) => {
//     console.log(`Result: ${JSON.stringify(result, undefined, 2)}`);
//   }, (error) => {
//     console.log(`Error: ${error}`);
//   });

// const newTodo = new Todo({
//   text: 'refactored something to do',
//   completedAt: 20170504
// });
//
// newTodo.save()
//   .then((result) => {
//     console.log(`Return: ${JSON.stringify(result, undefined, 2)}`);
//   }, (error) => {
//     console.log(`Error: ${error}`);
//   });
