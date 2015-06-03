/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt-nodejs');
var createSendToken = require('../services/createSendToken.js');

module.exports = {
	login: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if(!email || !password) {
			return res.status(401).send({
				message: 'username/email and password are required.'
			});
		}

		User.findOne({email: email}, function(err, foundUser) {
			if(!foundUser) {
				return res.status(401).send({
					message: 'username/email is invalid'
				});
			}

			// bcrype check password vs db pass
			bcrypt.compare(password, foundUser.password, function(err, isMatch) {
				if(err) {
					return res.status(403);
				}
				if(!isMatch) {
					return res.status(401).send({
						message: 'password does not match'
					});
				}

				// send jwt
				createSendToken(foundUser, res);

			});
		});
	},

	register: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if(!email || !password) {
			return res.status(401).send({
				message: 'username/email and password are required.'
			});
		}

		User.create({
			email: email,
			password: password
		}).exec(function(err, user) {
			if (err) {
				return res.status(403);
			}

			createSendToken(user, res);
		});
	}
};

