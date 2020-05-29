var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = function (path, callback) {
	fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
		if (err) {
			throw err;
			callback(err);
		}
		else {
			callback(null, html);
		}
	});
};

smtpTransport = nodemailer.createTransport(smtpTransport({
	service: process.env.MAIL_SERVICE,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS
	}
}));

function register(req) {
	console.log(__dirname)
	readHTMLFile(__dirname + '/mail/validation.html', function (err, html) {
		var template = handlebars.compile(html);
		var replacements = {
			name: req.fname,
			validation: process.env.VALIDATION + req.id,
			website: process.env.WEBSITE,
			team: process.env.TEAM,
			city: process.env.CITY
		};
		var htmlToSend = template(replacements);
		var mailOptions = {
			from: process.env.EMAIL,
			to: req.mail,
			subject: `Please validate your email for ${process.env.PROJECT}`,
			html: htmlToSend
		};
		smtpTransport.sendMail(mailOptions, function (error, response) {
			if (error) {
				throw new Error('Unable to send verification link');
			}
		});
	})
}

module.exports = {
	register
}