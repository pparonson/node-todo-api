const {MongoClient, ObjectID} = require('mongodb');

// const obj = new ObjectID();
// console.log(`obj: ${obj}`);

// arg1 string url of db, arg2
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to MongoDB server: ${err}`);
  }
  console.log('Connected to MongoDB server');

  // returns a mongodb cursor / pointer to obj
  // toArray() returns a promise
  // db.collection('Todos').find({
  //   _id: new ObjectID('58cf2ff4d7feaeac3bdfc512')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log(`Unable to fetch todos: ${err}`);
  // });

  // return the count of documents in the table
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  //   // console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log(`Unable to fetch todos: ${err}`);
  // });

  // find Brooke
  db.collection('Users').find({
    firstName: 'Brooke'
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log(`Unable to find user: ${err}`);
  });

  // db.close();
});
