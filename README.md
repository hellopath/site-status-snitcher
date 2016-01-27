# Site Status Snitcher 🚨

Checks the status of a list of sites and inform you by email if there is a connection problem with any.

# Usage

```
var snitcherCheck = require('../')

var sites = [
	'http://google.com',
	'http://amazon.com',
	'http://facebook.com'
]

// Also you can use it without the email notification.
var props = {
	'sites': sites,
	'email-notification': {
		'transport': 'smtps://user%40gmail.com:password@smtp.gmail.com',
		'from': 'user@gmail.com',
		'to': ['user1@gmail.com', 'user2@gmail.com'],
		'subject': '[PERSONAL AUTO MESSAGE][ISSUE]',
		'text': 'There is an issue with a site!!! See below the error.'
	}
}

snitcherCheck(props)

```
