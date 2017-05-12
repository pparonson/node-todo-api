// application root
const express = require('express');
// parses string body into obj
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const PORT = 3000;
const app = express();

// body-parser is going to take json data conv to obj, and attach it to the req obj
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  const {text} = req.body;
  const newTodo = new Todo({text});

  newTodo.save().then((result) => {
    res.send(JSON.stringify(result, undefined, 2));
  }, (error) => {
    res.status(400) // "Bad Request"
      .send(JSON.stringify(error, undefined, 2));
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// const newTodo = new Todo({
//   text: 'test create todo with mongoose ORM'
// });
//
// newTodo.save((result) => {
//   console.log(`Saved: `);
// }, (error) => {
//   console.log(`Error: `);
// });
