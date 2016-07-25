var constants = require("../constants"),
    _ = require('lodash');

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

var initial = {
    loggedIn: false,
    loading: false
};

var buildFriends = function(friends, value) {
    friends = friends || {};
    _.forEach(value.data, (friend) => {
        if(!friends[friend.id]) {
            friends[friend.id] = { name: friend.name, selected: false };
        }
    })
    return friends;  
}

module.exports = function(state = initial, action){
	var newstate = Object.assign({},state); // sloppily copying the old state here, so we never mutate it
	switch(action.type){
		case constants.LOAD_FRIENDS:
            if(action.value) {
                newstate.loading = false;
                newstate.loggedIn = true;                
                newstate.friends = buildFriends(newstate.friends, action.value);
                newstate.error = undefined;
            } else if(action.error) {
                newstate.loading = false;
                newstate.error = action.error;
            } else {
                newstate.loading = true;
                newstate.accessToken = action.accessToken;
            }
            return newstate;
        case constants.SELECT_FRIEND:
            newstate.friends[action.id].selected = action.selected;
            return newstate;
			
		default: return state;
	}
};
