var request = require('request');

var User = function(profile) {
	this.profile = profile
}

module.exports.Users = []

module.exports.getUser = function(token, callback) {
	
	var retVal = module.exports.Users[token]
	if(!retVal) {
		request("https://graph.facebook.com/me?access_token=" + token, function(error, response, body) {
			
			if(error) {
				callback(error, null);
			} else {
				retVal = new User(JSON.parse(body));
				module.exports.Users[token] = retVal;
				callback(null, retVal);
			}
		});
	} else {
		callback(null, retVal);
	}
}