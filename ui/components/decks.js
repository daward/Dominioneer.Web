var React = require("react"),
	ptypes = React.PropTypes,
  CheckSet = require('./checkset'),
    actions = require('../actions/actions'),
	ReactRedux = require("react-redux");

var Decks = React.createClass({
  
  propTypes: {
		decks: ptypes.object.isRequired,
    toggleDeck: ptypes.func.isRequired,
	},
  
	render: function() {
    return (<CheckSet data={this.props.decks} toggle={this.props.toggleDeck}/>);
	}
});

var mapStateToProps = function(state) {
	return {decks:state.decks};
};

var mapDispatchToProps = function(dispatch){
	return {
		toggleDeck: function(event) { 
      dispatch(actions.toggleDeck(event.target.id, event.target.checked)); 
    }
	}
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Decks);
