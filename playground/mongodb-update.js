const {MongoClient, ObjectID} = require('mongodb');

// const obj = new ObjectID();
// console.log(`obj: ${obj}`);

// arg1 string url of db, arg2
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to MongoDB server: ${err}`);
  }
  console.log('Connected to MongoDB server');

  db.collection('Users')
    // args: findOneAndUpdate(filter, update, options, callback)
    .findOneAndUpdate({
      _id: new ObjectID("5909e03dd094267304cdc569")
    }, {
      $set: {
        name: 'Preston Peter Aronson'
      },
      $inc: {
        age: -10
      }
    }, {
      returnOriginal: false
    })
    .then((result) => {
      console.log(`Result: ${JSON.stringify(result, undefined, 2)}`);
    }, (err) => {
      console.log(`Error: ${err}`);
    });

  // db.close();
});
