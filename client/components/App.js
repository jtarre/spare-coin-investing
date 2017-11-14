const React = require('react');
const ReactDOM = require('react-dom');

import { BrowserRouter as Router,
        Route,
        Link,
        Switch } from 'react-router-dom';

const Purchase = require('./Purchase');
const Contact = require('./Contact');
const Home = require('./Home');

const plaid_handler = require('../plaid/plaid_handler');
const get_coinbase_tokens = require('../coinbase/get_coinbase_tokens');
const buy = require('../coinbase/buy');
require('../index.css')

// https://github.com/ReactTraining/react-router/issues/4105#issuecomment-291834881
// TODO: Error, Plaid isn't loaded (where to place error condition?)
class App extends React.Component {
    // the App component stores all the required state
    constructor(props) {
        super(props)
        const { 
            plaid_link,get_access_token,
            get_transactions, 
            get_loose_change } = plaid_handler;

        this.plaid_link = plaid_link.bind(this);
        this.get_loose_change = get_loose_change.bind(this); 
        this.onLooseChangeChange = this.onLooseChangeChange.bind(this);
        this.buy = buy.bind(this);
        
        // the coinbase auth on the server sends a redirect to 
        // the home page with the access token and refresh token
        let {
            coinbase_access_token, 
            coinbase_refresh_token,
            isCoinbaseActive } = get_coinbase_tokens(window.location.href);
        
        this.state = {
            // step 1: get coinbase access token
            bitcoin_access_token: coinbase_access_token,
            bitcoin_refresh_token: coinbase_refresh_token,
            isCoinbaseActive: isCoinbaseActive,
            // step 2: get bank account info
            bank_access_token: "",
            bank_account_id: "",
            isBankAccountActive: false,
            // step 3: calculate loose change
            loose_change: 0,
            
            // step 4: take coinbase info + loose change
            // to purchase bitcoin through coinbase
            isBuySuccessful: false
        }
    }

    onLooseChangeChange(e) {
        this.setState({loose_change: e.target.value}); 
    }

    componentDidMount() {
        // we create Plaid object on page load 
        // to make sure concurrent users don't overwrite a global 
        // Plaid object. 
        // That wouldn't be good!
        let save_plaid_link = plaid_handler.save_plaid_link.bind(this);
        let plaidClient = save_plaid_link();
        this.setState({plaidClient: plaidClient});
    }

    render() {
        const { 
            bank_access_token, 
            bank_account_id, 
            bitcoin_access_token,
            bitcoin_refresh_token,
            loose_change,
            isCoinbaseActive,
            isBankAccountActive,
            isBuySuccessful } = this.state;
        return (
            <Router>
                <div>
                    <nav className="navbar sectionWrapper">
                        <ul className="nav navbar-nav mainnav">
                            <li className="navbutton">
                                <Link className="navLink" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="navbutton">
                                <Link className="navLink" to="/purchase">
                                    Purchase
                                </Link>
                            </li>
                            <li className="navbutton">
                                <Link className="navLink" to="/contact">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/purchase" render={() => (
                            <Purchase 
                                // Data
                                bank_access_token={bank_access_token}
                                bank_account_id={bank_account_id}
                                bitcoin_access_token={bitcoin_access_token}
                                bitcoin_refresh_token={bitcoin_refresh_token}
                                loose_change={loose_change}
                                isCoinbaseActive={isCoinbaseActive}
                                isBankAccountActive={isBankAccountActive}
                                isBuySuccessful={isBuySuccessful}

                                // Functions
                                plaid_link={this.plaid_link}
                                get_loose_change={this.get_loose_change}
                                onLooseChangeChange={this.onLooseChangeChange}
                                buy={this.buy}

                            />)}/>
                        <Route path="/contact" component={Contact}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;