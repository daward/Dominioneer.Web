var React = require("react"),
	ptypes = React.PropTypes,
	RB = require('react-bootstrap'),
    _ = require('lodash'),
    actions = require('../actions/actions'),
	ReactRedux = require("react-redux");

var Game = React.createClass({
    propTypes: {
		gameData: ptypes.object.isRequired,
        createGame: ptypes.func.isRequired,
	},
	render: function() {
        var gameDisplay;
        var game = this.props.gameData.game;
        if(game) {           
            
            var items = _.map(game.cards, card => 
                (
                    <tr>
                        <td>{card.name}</td>
                        <td>{card.cost}</td>
                        <td>{card.set}</td>
                        <td>{card.type.join(', ')}</td>
                    </tr>
                )
            );
            
            gameDisplay = (
                <RB.Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Card</th>
                        <th>Cost</th>
                        <th>Set</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </RB.Table>
            );
        }
        
        return (     
            <div>
                { gameDisplay }
                <RB.Button bsStyle="primary" onClick={ this.props.createGame }>Create New Game</RB.Button>
            </div>
		);
	}
});

var mapStateToProps = function(state) {
	return { gameData: state.game };
};

var mapDispatchToProps = function(dispatch){
	return {
		createGame: function() { 
            dispatch(actions.createGame()); 
        }
	};
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Game);
