var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var db = require('./db');
var app     = express();
var path    = require("path");
const Joi = require('joi');
const authorize = require('./authorize')
const userService = require('./user.service');

function validateRequest(req, next, schema) {
  const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
      next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
  } else {
      req.body = value;
      next();
  }
}

router.post('/login', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.post('/post', createpost );


function authenticateSchema(req, res, next) {
  const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  userService.authenticate(req.body)
      .then(user => res.json(user))
      .catch(next);
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).required()
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService.create(req.body)
      .then(() => res.json({ message: 'Registration successful' }))
      .catch(next);
}
function createpost(req,res,next){
  var postData  = req.body;
    connection.query('INSERT INTO posts SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });

}

router.get('/post', function(res,req,next){
  db.query('select * from posts', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

module.exports = router;