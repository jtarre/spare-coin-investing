var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.route;
var api = require('../utils/api');
var coinbase = ('../utils/coinbase-api');

require('./index.css');

class App extends React.component {
    render() {
        return (
            <Coinbase />
        )
    }
}

class Coinbase extends React.component {
    render() {
        return (
            <div>
                <h2>Coinbase Investing!</h2>
                <button onclick="{coinbase.coinbaseUser()}">Connect Coinbase</button>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);