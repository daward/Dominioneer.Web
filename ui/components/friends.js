var React = require('react'),
	ptypes = React.PropTypes,
    ReactDOM = require('react-dom'),
    CheckSet = require('./checkset'),
    FacebookLogin = require('react-facebook-login'),
    _ = require('lodash'),
    actions = require('../actions/actions'),
	ReactRedux = require("react-redux");

var Friends = React.createClass({
    
    propTypes: {
        loggedIn: ptypes.bool.required,
        login: ptypes.func.isRequired,
        friends: ptypes.object.isRequired,
        toggleFriend: ptypes.func.isRequired
	},
    
	render: function() {      
        if(!this.props.loggedIn) {
            return (
                <FacebookLogin
                    appId="973648849342797"
                    autoLoad={true}
                    callback={this.props.login} />
            );
        } else {
            return (<CheckSet data={this.props.friends} toggle={this.props.toggleFriend} />);
        }
    }
});

var mapStateToProps = function(state) {
	return { 
        loggedIn: state.friends.loggedIn,
        friends: state.friends.friends
     };
};

var mapDispatchToProps = function(dispatch) {
	return {
		login: function(response) { 
            dispatch(actions.loadFriends(response.id, response.accessToken));
        },
        toggleFriend: function(event) { 
            dispatch(actions.toggleFriend(event.target.id, event.target.checked));
        }
	};
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Friends);