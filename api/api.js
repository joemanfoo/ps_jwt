var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var jwt = require('jwt-simple');
var passport = require('passport');
var localStrategy = require('./services/LocalStrategy.js');

var moment = require('moment');

var createSendToken = require('./services/jwt.js');

var facebookAuth = require('./services/facebookAuth.js');
var googleAuth = require('./services/googleAuth.js');
var jobs = require('./services/jobs.js');

var emailVerification = require('./services/emailVerification.js');

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});

// Login and Register routes
passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);

app.post('/register', passport.authenticate('local-register'), function(req, res) {
	emailVerification.send(req.user.email);
	createSendToken(req.user, res);
});

app.get('/auth/verifyEmail', emailVerification.handler);

app.post('/login', passport.authenticate('local-login'), function(req, res) {
	createSendToken(req.user, res);
});


app.get('/jobs', jobs);

// oAuthProviders
app.post('/auth/facebook', facebookAuth);
app.post('/auth/google', googleAuth);

mongoose.connect('mongodb://localhost/psjwt');

var server = app.listen(3000, function() {
	console.log('api listening on ', server.address().port);
});