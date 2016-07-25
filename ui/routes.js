/*
This is the "sitemap" of our app!
*/

var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Wrapper = require('./components/wrapper'),
    Home = require('./components/home');

module.exports = (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={Home} />
    </Route>
);
