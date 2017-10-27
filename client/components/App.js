var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Switch = ReactRouter.Switch;
// var api = require('../utils/api');
// var coinbase = ('../utils/coinbase-api');

var Dashboard = require('./Dashboard');
var Purchase = require('./Purchase');
var Account = require('./Account');
console.log('plaidapp...', Plaid);
class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/purchase">Purchase</Link></li>
                        <li><Link to="/account">Account</Link></li>
                    </ul>
                    
                    <Switch>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route path="/purchase" component={Purchase}/>
                        <Route path="/account" component={Account}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;