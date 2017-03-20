const {MongoClient, ObjectID} = require('mongodb');

// const obj = new ObjectID();
// console.log(`obj: ${obj}`);

// arg1 string url of db, arg2
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to MongoDB server: ${err}`);
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // use deleteMany to delete duplicates
  // db.collection('Users').deleteMany({
  //   firstName: 'Brittany'
  // }).then((result) => {
  //   console.log(`Result: ${result}`);
  // }, (err) => {
  //   console.log(`Error: ${err}`);
  // });

  // use findOneAndDelete to delete a doc by id
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('58ce8977856e3331915b018e')
  }).then((result) => {
    console.log(`Result: ${JSON.stringify(result, undefined, 2)}`);
  }, (err) => {
    console.log(`Error: ${err}`);
  });

  // db.close();
});
