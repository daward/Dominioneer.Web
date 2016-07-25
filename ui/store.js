var Redux = require("redux"),
	decksReducer = require("./reducers/decks"),
	gameReducer = require("./reducers/games"),
	friendsReducer = require("./reducers/friends"),
	thunk = require('redux-thunk'); // allows us to use asynchronous actions

var rootReducer = Redux.combineReducers({
	decks: decksReducer,
	game: gameReducer,
	friends: friendsReducer
});

module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer);
