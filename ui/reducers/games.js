var constants = require("../constants");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

var initial = {
}

module.exports = function(state = initial, action){
	var newstate = Object.assign({},state); // sloppily copying the old state here, so we never mutate it
	switch(action.type){
		case constants.CREATE_GAME:
            if(action.value) {
                newstate.loading = false;
                newstate.game = action.value;
                newstate.error = undefined;
            } else if(action.error) {
                newstate.loading = false;
                newstate.error = action.error;
                newstate.game = {};
            } else {
                newstate.loading = true;
            }
            
			return newstate;
		default: return state;
	}
};
