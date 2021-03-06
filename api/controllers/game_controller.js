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
  getGame: getGame,
  generateGame: generateGame,
  randGame: randGame,
  playGame: playGame,
};

function playGame(req, res) {
	
	var id = req.swagger.params.gameId.value,
			 historyBuilder = new Dominioneer.HistoryBuilder(database);
	
	var retVal = new Object();
	retVal["id"] = id;  
	
	historyBuilder.getAll(getPlayers(req), function(histories) {
		for(var i = 0; i < histories.length; i++) {
			histories[i].play(id);
		}
		
		res.send(retVal);
		return;
	});
}

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getGame(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var id = req.swagger.params.gameId.value
  var deck = new Dominioneer.Deck(null);
  var retVal = new Object();
  retVal["id"] = id
  retVal["cards"] = deck.getCards(Dominioneer.Game.decode(id))
  
  res.send(retVal);
}

function randGame(req, res) {
	var builder = new Dominioneer.GameBuilder(),
		deck = new Dominioneer.Deck(req.swagger.params.sets.value),
		cards = [],
		retVal = new Object();
	
	if(req.swagger.params.cards.value) {
		cards = req.swagger.params.cards.value;
	}
	
	retVal["id"] = builder.createGame(deck, cards);
	retVal["cards"] = deck.getCards(Dominioneer.Game.decode(retVal["id"]));
	
	res.send(retVal);
}

function generateGame(req, res) 
{	
	var builder = new Dominioneer.GameBuilder();
	var deck = new Dominioneer.Deck(req.swagger.params.sets.value);
	var retVal = new Object();
	
	try {
		var historyBuilder = new Dominioneer.HistoryBuilder(database);
		historyBuilder.getAll(getPlayers(req), function(histories) {
			builder.createBestGame(deck, [], 10, histories, function(game) {
				retVal["id"] = game.game;
				retVal["cards"] = deck.getCards(Dominioneer.Game.decode(retVal["id"]));
				retVal["rating"] = game.ratingTotal;
				res.send(retVal)
			});
		});
	}
	catch(err) {
		retVal["message"] = err;
		res.status(400).send(retVal);
		return;
	}	
}

function getPlayers(req) {
	var players = [];
		
	if(req.swagger.params.players.value) {
		players = req.swagger.params.players.value;
	}
	
	players.push(req.user.profile.id);
	
	return players;
}
