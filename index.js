var request = require('request')
var colors = require('colors')
var nodemailer = require('nodemailer');

module.exports = function(props) {
	var timeoutInMilliseconds = props.timeout || 10*1000
	for (var i = 0; i < props.sites.length; i++) {
		var url = props.sites[i]
		var opt = {
			url: url,
			timeout: timeoutInMilliseconds
		}
		request(opt, function(err, res, body) {
			if (err) {
				onError(err)
				return
			}
			var statusCode = res.statusCode
			var req = res.request
			console.log(colors.green('–'))
			console.log(colors.green('Everything fine with:'), colors.yellow(req.uri.host));
			console.log(colors.green('Status code'), colors.yellow(res.statusCode))
		})
	};

	var onError = function(err) {
		console.log(colors.red('–'))
		console.log(colors.red('A problem appeared on host:'), colors.yellow(err));

		var vars = props['email-notification']
		if(vars == undefined) return

		// create reusable transporter object using the default SMTP transport 
		var transporter = nodemailer.createTransport(vars.transport);

		var txtA = vars.text
		var txtB = err

		// setup e-mail data with unicode symbols 
		var mailOptions = {
			from: vars.from, // sender address 
			to: vars.to.join(), // list of receivers 
			subject: vars.subject, // Subject line 
			text: txtA + ' ' + txtB, // plaintext body 
			html: '<b>'+ txtA +'</b>' + '<br><br>' + txtB // html body 
		};

		// send mail with defined transport object 
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return console.log(colors.red(error))
			}
			console.log(colors.green('Message sent: ' + info.response))
		});
	}

};


