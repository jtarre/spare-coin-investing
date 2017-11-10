var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
require('../config');

ReactDOM.render(
    <App />,
    document.getElementById('app')
);