const React = require('react');
import { BrowserRouter as Router, 
        Route,
        Link,
        Switch} from 'react-router-dom';
const BuyBitcoin = require('./BuyBitcoin');
const Authorize = require('./Authorize');
const axios = require('axios');

// excellent explanation of passing props to routes in the react-router library
// https://github.com/ReactTraining/react-router/issues/4105

const SectionNav = ({header, link}) => (
    <section className="masthead">
        <div className="sectionNavWrapper">
            <div className="row">
                <nav>
                    <ul className="sectionNav">
                        <li className="sectionNav-item">
                            <Link className="sectionNav-link" to={`${link}`}>{header}</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
)

const Purchase = ({ bank_access_token, bank_account_id, 
    bitcoin_access_token, 
    handleBankAccessTokenChange,
    handleBankAccountIdChange }) => (    
    <div>
        <SectionNav header="Authorize Accounts" link="/purchase/authorize"/>
        <Route path="/purchase/authorize" render={
            () => ( 
                <Authorize 
                    bank_access_token={bank_access_token}
                    bank_account_id={bank_account_id}
                    bitcoin_access_token={bitcoin_access_token}
                    handleBankAccessTokenChange={handleBankAccessTokenChange}
                    handleBankAccountIdChange={handleBankAccountIdChange}
                /> )}
        />
        <SectionNav header="Buy Bitcoin" link="/purchase/buy-bitcoin" />
        <Route path="/purchase/buy-bitcoin" render={ () => (
            <BuyBitcoin 
                bank_access_token={bank_access_token}
                bank_account_id={bank_account_id}
                bitcoin_access_token={bitcoin_access_token}
                handleBankAccessTokenChange={handleBankAccessTokenChange}
                handleBankAccountIdChange={handleBankAccountIdChange}
            />
        )}/>
    </div>
)

module.exports = Purchase;