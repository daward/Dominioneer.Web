var React = require("react"),
    ptypes = React.PropTypes,
    RB = require('react-bootstrap'),
    _ = require('lodash'),
    ReactRedux = require("react-redux");

var CheckSet = React.createClass({

    propTypes: {
        data: ptypes.object.isRequired,
        toggle: ptypes.func.isRequired,
    },

    render: function () {

        var checkBoxes = [];
        _.forIn(this.props.data, (value, key) => {
            checkBoxes.push(
                (<RB.Checkbox id={key} onChange={this.props.toggle.bind(this) }>
                    {value.name}
                </RB.Checkbox>));
        });

        return (
            <div>
                {checkBoxes}
            </div>
        );
    }
});

module.exports = CheckSet;
