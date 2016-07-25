var React = require("react"),
	ptypes = React.PropTypes,
	RB = require('react-bootstrap'),
	Decks = require('./decks'),
	Game = require('./game'),
	Friends = require('./friends'),
	ReactRedux = require("react-redux");

var Home = React.createClass({

	handleSelect : function(selectedKey) {

	},

	render: function(){
		return (
			<RB.Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
		    <RB.Tab eventKey={1} title="Friends"><Friends/></RB.Tab>
		    <RB.Tab eventKey={2} title="Decks"><Decks/></RB.Tab>
		    <RB.Tab eventKey={3} title="Game"><Game/></RB.Tab>
		  </RB.Tabs>
		);
	}
});

var mapStateToProps = function(state){
	return {};
};

module.exports = ReactRedux.connect(mapStateToProps)(Home);
