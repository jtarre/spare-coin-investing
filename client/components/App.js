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
var Contact = require('./Contact');
require('../index.css')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isSelected: ''}
    }
    render() {
        var tabs = ['Purchase', 'Contact'];
        return (
            <Router>
                <div>
                    <nav className="navbar">
                        <ul className="nav navbar-nav mainnav">
                            {tabs.map(function(tab) {
                                return (
                                    <li className="navbutton" key={tab+"-li"}><Link className={"navLink"} to={"/" + tab.toLowerCase()} key={tab+"-link"}>{tab}</Link></li>        
                                )
                            })}
                        </ul>
                    </nav>
                    
                    <Switch>
                        <Route path="/purchase" component={Purchase}/>
                        <Route path="/contact" component={Contact}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;