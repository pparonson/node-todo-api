const {MongoClient, ObjectID} = require('mongodb');

// const obj = new ObjectID();
// console.log(`obj: ${obj}`);

// arg1 string url of db, arg2
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to MongoDB server: ${err}`);
  }
  console.log('Connected to MongoDB server');

  // findOneAndUpdate
  // findOneAndUpdate(filter, update, options, callback)
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('58cfd415d7feaeac3bdfcdf7')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log(err);
  // });

  // update firstName and inc age
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('58cf2caae733163ea1dedbb8')
  }, {
    $set: {
      firstName: 'Preston'
    },
    $inc: {
      age: 40
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });
  // db.close();
});
