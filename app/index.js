var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router-dom');
// var Router = ReactRouter.BrowserRouter;
// var Route = ReactRouter.route;
// var api = require('../utils/api');
// var coinbase = ('../utils/coinbase-api');
var App = require('./components/App');
require('./index.css');
ReactDOM.render(
    <App />,
    document.getElementById('app')
);