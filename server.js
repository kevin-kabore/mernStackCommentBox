'use strict'

// import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//model
var Comment = require('./model/comments');

// and create instances
var app = express();
var router = express.Router();

// set port to either predetermined port or 30001
var port = process.env.API_PORT || 3001;

// db config
var mongoDB = 'mongodb://kevinkabore:secretpassword@ds021694.mlab.com:21694/kaboredb';
mongoose.connect(mongoDB, { useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure API to use bodyParser and look for JSON data in request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// To prevent errors from Cross Origin Resource Sharing, set headers to allow CORS with middleware:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type Access-Control-Request-Method, Access-Control-Request-Headers');

  // remove cacheing to get most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// set up route path & initialize the API
router.get('/', function(req, res) {
  res.json({message: 'API initialized'});
})

// add /comments route to /api router
router.route('/comments')
  // retrieve all comment from the database
  .get(function(req, res) {
    //look at Comment schema
    Comment.find(function(err, comments){
      if(err) {
        res.send(err);
      }
      // res with json object of database comments
      res.json(comments)
    });

  })
  // post new comment to the database
  .post(function(req, res) {
    var comment = new Comment();
    // body-parser lets us use req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
      if(err) {
        res.send(err)
      }
      res.json({message: 'Comment successfully added!'});
    })
  })

// Route to a specific comment based on db id
router.route('/comments/:comment_id')
  //allows to update based on id passed to the route
  .put(function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      if (err) {
        res.send(err)
      }
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.author) ? comment.author = req.body.author : null;
      (req.body.text) ? comment.text = req.body.text : null;
      //save comment
      comment.save(function(err) {
        if(err)
          res.send(err)
        res.json({message: 'Comment has been updated'})
      })
    })
  })
  // delete method for removing comment from database
  .delete(function(req, res){
    // selects comment by its ID and removes from db
    Comment.remove({_id: req.params.comment_id}, function(err, comment) {
      if(err){
        res.send(err)
      }
      res.json({message: 'Comment has been deleted' })
    })
  })

// use router configuration when we call /api
app.use('/api', router);

// start the server and listen for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
})
