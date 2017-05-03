const {MongoClient, ObjectID} = require('mongodb');

// use ObjectID to manually create db obj id
// const obj = new ObjectID();
// console.log(`obj: ${obj}`);

// arg1 string url of db, arg2
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to MongoDB server: ${err}`);
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return `Unable to insert todo obj: ${err}`
    }
  // display the inserted obj
  // undefined arg: filter fn
  // 2 arg: indentation
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // db.collection('Users').insertOne({
  //   firstName: 'Elle',
  //   lastName: 'Aronson',
  //   age: 2,
  //   location: 'Centennial'
  // }, (err, result) => {
  //   if (err) {
  //     return `Unable to insert todo obj: ${err}`;
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(`id: ${result.ops[0]._id.getTimestamp()}`);
  // });

  db.close();
});
