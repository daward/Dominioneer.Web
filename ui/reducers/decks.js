var constants = require("../constants");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

var initial = {
	standard: {name: "Standard", selected: false },
	intrigue:  {name: "Intrigue", selected: false }, 
	seaside:  {name: "Seaside", selected: false }, 
	alchemy:  {name: "Alchemy", selected: false }, 
	prosperity:  {name: "Prosperity", selected: false }, 
	hinterlands:  {name: "Hinterlands", selected: false }, 
	guilds:  {name: "Guilds", selected: false }, 
	cornucopia:  {name: "Cornucopia", selected: false },
	"Dark Ages":  {name: "Dark Ages", selected: false }
}

module.exports = function(state = initial, action){
	var newstate = Object.assign({},state); // sloppily copying the old state here, so we never mutate it
	switch(action.type){
		case constants.TOGGLE_DECK:
			newstate[action.deck].selected = action.selected;
			return newstate;
		default: return state;
	}
};
