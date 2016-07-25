/*
This module contains action creators. They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var constants = require("../constants"),
    _ = require('lodash');

module.exports = function(dispatch, getState) {
    
    var baseUrl = "http://dominioneer.elasticbeanstalk.com";
    var getKeys = function (source) {
        var retVal = [];
        var data = _.get(getState(), source);
        var decks = _.forIn(data, (value, key) => {
            if(value.selected) {
                retVal.push(key);
            }
        });
        
        return retVal;
    };
    
    var sets = getKeys("decks");
    var friends = getKeys("friends.friends");
    
    var getRand = function() {
        var url = baseUrl + "/randGame?sets=" + sets.join(",");

        dispatch({ type: constants.CREATE_GAME });

        fetch(url)
            .then(response => response.json())
            .then(value => dispatch({ type: constants.CREATE_GAME, value: value }))
            .catch(err => dispatch({ type: constants.CREATE_GAME, error: err }));
    };
        
    var getCustom = function() {
        var url = baseUrl + "/games?sets=" + sets.join(",") + "&players=" + friends.join(",");
        var accessToken = getState().friends.accessToken;
        
        var myHeaders = new Headers(); {}
        myHeaders.append("Authorization", "Bearer " + accessToken);
        
        var options = { method: 'GET', headers: myHeaders};
        
        dispatch({ type: constants.CREATE_GAME });

        fetch(url, options)
            .then(response => response.json())
            .then(value => dispatch({ type: constants.CREATE_GAME, value: value }))
            .catch(err => dispatch({ type: constants.CREATE_GAME, error: err }));
    };    
    
    if(friends) {
        getCustom(sets, friends);
    } else {
        getRand(sets)
    }
};