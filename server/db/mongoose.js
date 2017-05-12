const mongoose = require('mongoose');
/*
mongoose supports callback by default, however config to use es6 promise instead
Config to use the native global promise obj
*/
mongoose.Promise = global.Promise;
// connect to mongo db
mongoose.connect('mongodb://localhost:27017/TodoApp');

// export mongoose
module.exports = {mongoose};
