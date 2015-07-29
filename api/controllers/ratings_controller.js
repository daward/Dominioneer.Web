'use strict';
var Dominioneer = require('dominioneer');
var AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
var database = new AWS.DynamoDB();

/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  addRating: rate,
  getRating: getRating,
  getRatings: getRatings
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function rate(req, res) {	
	var id = req.user.profile.id;
	var gameId = req.swagger.params.gameId.value;
	var rating = req.swagger.params.rating.value;
	
	var historyBuilder = new Dominioneer.HistoryBuilder(database);
	
	historyBuilder.get(id, function(history) {
		history.rate(gameId, rating)
		
		var retVal = new Object();
		retVal["gameId"] = gameId;
		retVal["userId"] = id;
		retVal["rating"] = rating;
		res.send(retVal);	
	});
}

function getRating(req, res) {
	var id = req.user.profile.id;
	var gameId = req.swagger.params.gameId.value;
	
	var historyBuilder = new Dominioneer.HistoryBuilder(database);
	
	historyBuilder.get(id, function(history) {
		
		for (var i = 0; i < history.ratedGames.length; i++) {
			if (history.ratedGames[i].game == gameId) {
				res.send(convertRating(history.ratedGames[i], id));
				return;
			}
		}	

		for (var i = 0; i < history.unratedGames.length; i++) {
			if (history.unratedGames[i].game == gameId) {
				res.send(convertRating(history.unratedGames[i], id));
				return;
			}
		}	
		res.sendStatus(404);	
	});	
}

function getRatings(req, res) {
	var id = req.user.profile.id;
	var historyBuilder = new Dominioneer.HistoryBuilder(database);
	
	historyBuilder.get(id, function(history) {
		var retVal = [];
		
		for (var i = 0; i < history.ratedGames.length; i++) {
			retVal.push(convertRating(history.ratedGames[i], id));
		}
		
		for (var i = 0; i < history.unratedGames.length; i++) {
			retVal.push(convertRating(history.unratedGames[i], id));
		}
		res.send(retVal);
	});	
}

function convertRating(game, userId) {
	if(game.rating != undefined) {
		return {
			"gameId": game.game,
			"userId": userId,			
			"rating": parseInt(game.rating)
		};
	} else {
		return {
			"gameId": game.game,
			"userId": userId
		};
	}
}