'use strict';

//import dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create new instance of the mongoose.schema takes an object with properties of data
var CommentsSchema = new Schema({
  author: String,
  text: String
});

// export our module to use in server.js
module.exports = mongoose.model('Comment', CommentsSchema);
