const {MongoClient, ObjectID} = require('mongodb');

// const obj = new ObjectID();
// console.log(`obj: ${obj}`);

// arg1 string url of db, arg2
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to MongoDB server: ${err}`);
  }
  console.log('Connected to MongoDB server');

  db
    .collection('Users') // returns collection
    .find({
      name: 'Preston Aronson'
    }) // return in-memory cursor
    .toArray()
    // result returns as first arg of success handler
    .then((result) => {
      console.log(`Result: ${JSON.stringify(result, undefined, 2)}`);
    }, (err) => {
      console.log(`Unable to fetch data: ${err}`);
    }); // returns a promise

  // db.close();
});
