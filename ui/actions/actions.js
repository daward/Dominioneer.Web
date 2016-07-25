/*
This module contains action creators. They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var constants = require("../constants"),
	_		  = require('lodash'),
	gameAction = require('./game')

module.exports = {
	toggleDeck: function(deck, selected) {
		return function(dispatch, getState) {
			dispatch({type:constants.TOGGLE_DECK, deck:deck, selected:selected});
		};
	},
	
	toggleFriend: function(id, selected) {
		return function(dispatch, getState) {
			dispatch({type:constants.SELECT_FRIEND, id: id, selected:selected });
		}
	},
	
	loadFriends: function(id, accessToken) {
		return function(dispatch, getState) {
			var url = `https://graph.facebook.com/v2.6/${id}/friends`;
			
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Bearer " + accessToken);
			
			var options = { method: 'GET', headers: myHeaders};
			
			dispatch({ type: constants.LOAD_FRIENDS, accessToken: accessToken });
			fetch(url, options)
				.then(response => response.json())
				.then(value => {
					console.log(value);
					dispatch({ type: constants.LOAD_FRIENDS, value: value })
				})
    			.catch(err => dispatch({ type: constants.LOAD_FRIENDS, error: err }));
		}
	},
	
	createGame: function() { return gameAction; }
};