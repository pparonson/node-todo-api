const express = require('express');
const {ObjectID} = require('mongodb');
// parses string body into obj
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const PORT = 3000;
const app = express();

// body-parser is going to take json data conv to obj, and attach it to the req obj
// the return type of the bodyParser.json() called fn is a fn
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  // const {text} = req.body;
  const newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((result) => {
    res.send(result);
  }, (error) => {
    res.status(400) // "Bad Request"
      .send(JSON.stringify(error, undefined, 2));
  });
});

app.get('/todos', (req, res) => {
  // return all todos
  Todo.find()
    .then((result) => {
      //  return as obj rather than array for more flexibility
      res.send({result});
    }, (err) => {
      res.status(400)
        .send(JSON.stringify(err, undefined, 2));
    });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  // ObjectID.isValid()
  if (!ObjectID.isValid(id)) {
    // bad request
    res.status(404).send();
  }

  Todo.findById(id).then((result) => {
    if (!result) {
      // Not found
      res.status(404).send();
      return;
    }

    res.send({result});
  }).catch((e) => {
    res.status(400).send();
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

module.exports = {app};
