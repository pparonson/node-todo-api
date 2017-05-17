const mongoose = require('mongoose');
/*
mongoose supports callback by default, however config to use es6 promise instead
Config to use the native global promise obj
*/
mongoose.Promise = global.Promise;
// connect to mongo db at remote host or localhost
// set up env.port variable for app deployment
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
// mongoose.connect('mongodb://localhost:27017/TodoApp');
// mongoose.connect('mongodb://admin:YGd8eXZvwixx74D@ds143211.mlab.com:43211/com-pparonson-node-todo-api');
mongoose.connect(url);

// export mongoose
module.exports = {mongoose};
