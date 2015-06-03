var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var User = require('../models/User.js');

var config = require('./config.js');


var model = {
	verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
	title: 'psJWT',
	subTitle: 'Thanks for signing up',
	body: 'Please verify your email address by clicking the button below'
};


exports.send = function(email) {
	var payload = {
		sub: email,
	};

	var token = jwt.encode(payload, config.EMAIL_SECRET);

	var transporter = nodemailer.createTransport(smtpTransport({
		host: 'secure.emailsrvr.com',
		secure: true,
		auth: {
			user: 'auto@in-chronos.com',
			pass: 'c2nn0n11'
		}
	}));

	var mailOptions = {
		from: 'Accounts <auto@in-chronos.com>',
		to: email,
		subject: 'psJWT Account Verification',
		html: getHTML(token)
	};

	console.log('About to send email: ' + email + '...');
	transporter.sendMail(mailOptions, function(err, info) {
		if(err) throw new Error(err.message);

		console.log('email sent ' + info.response);
	});
	console.log('Email should have been sent. Token: ' + model.verifyUrl);
};

exports.handler = function(req, res) {
	var token = req.query.token;
	var payload = jwt.decode(token, config.EMAIL_SECRET);

	var email = payload.sub;

	if(!email) return handleError(res);

	User.findOne({email: email},function(err, foundUser) {
		if(err) return res.satus(500);

		if(!foundUser) return handleError(res);

		if(!foundUser.active) {
			foundUser.active = true;

			foundUser.save(function(err) {
				if(err) return res.status(500);

				return res.redirect(config.APP_URL);
			});
		}

	})

}
function getHTML(token) {
	var path = './views/emailVerification.html';
	var html = fs.readFileSync(path, encoding = 'utf8');

	var template = _.template(html);

	model.verifyUrl += token;

	return template(model);
}

function handleError(res) {
	return res.status(401).send({
		message: 'Authentication failed, unable to verify email'
	});
}
_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};
