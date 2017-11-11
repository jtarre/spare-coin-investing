var axios = require('axios');

var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Switch = ReactRouter.Switch;

var plaid_handler = require('../helpers/plaid_handler');
var coinbase_authorize_user = require('../coinbase/authorize_user');

var buy = require('../coinbase/buy');

function Coinbase(props) {
    return (
        <div>
            <button onClick={coinbase_authorize_user}>
                Authorize Coinbase
            </button>
        </div>
        
    );
}

function Plaid(props) {
    return (
        <div>
            <button onClick={plaid_handler.plaid_link}>Authorize Bank Account</button>
        </div>
    );
}

class LooseChange extends React.Component {
    // todo: need to pass the loose change value from here up to the parent
    // todo: need to save the loose change value on the parent
    constructor(props) {
        super(props);
        this.get_loose_change = this.get_loose_change.bind(this); // do I have to bind?
    }
    
    get_loose_change() {
        this.props.get_loose_change();    
    }
    
    render() {
        var loose_change = this.props.loose_change;
        return (
            <div>
                <p>From the last 30 days...</p>
                <button onClick={this.get_loose_change}>
                    Get loose change
                </button>
                <h3>Loose Change: {loose_change}</h3>
                
            </div>
        );
    }
}

function Buy(props) {
    // todo: need to pass in loose change as a prop to the buy button
    // todo: need to define buy
    return (
        <div>
            <button onClick={buy}>Buy Bitcoin</button>
        </div>
    );
}

class Authorize extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Authorize Coinbase</h1>
                <Coinbase />
                
                <h1>Authorize your bank account</h1>
                <Plaid />
            </div>
        )
    }
}

class BuyBitcoin extends React.Component {
    constructor(props) {
        super(props);
        this.get_loose_change = plaid_handler.get_loose_change.bind(this);
        this.state = { loose_change: "" };
    }
    render() {
        var loose_change = this.state.loose_change;
        return (
            <div>
                <h1>Calculate your loose change</h1>
                <LooseChange
                    loose_change={loose_change}
                    get_loose_change={this.get_loose_change}
                />
                
                <h1>Buy Bitcoin with Coinbase</h1>
                <Buy />
            </div>
        )
    }
}

/*
 * Ok, design
 * san serif font
 * mvp
 * no database
 * walk through form
 * like typescript
 * step 1. authorize bank account
 * step 2. authorize coinbase
 * step 3. get value of loose change
 * step 3a. print value of loose change
 * 3a1. congrats, you have some loose change! 
 * 4. make purchase
 * 4a. Buy {loose_change} worth of bitcoin!
 */
class Purchase extends React.Component {
    constructor(props) {
        super(props);
        console.log("what's in Purchase's props?\n", props);
        console.log('constructor this...\n', this);
        this.get_loose_change = plaid_handler.get_loose_change.bind(this);
        this.state = { loose_change: "" };
    }
    
    render() {
        var loose_change = this.state.loose_change;
        return (
            <div>
                <section className="masthead">
                    <div className="sectionNavWrapper">
                        <div className="row">
                            <nav>
                                <ul className="sectionNav">
                                    <li className="sectionNav-item">
                                        <Link className="sectionNav-link" to="/purchase/authorize">Connect</Link>
                                    </li>
                                    <li className="sectionNav-item">
                                        <Link className="sectionNav-link" to="/purchase/buy-bitcoin">Buy Bitcoin</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <Route path="/purchase/authorize" component={Authorize} />
                <Route path="/purchase/buy-bitcoin" component={BuyBitcoin} />
                    
            </div>
        )
    }
}

module.exports = Purchase;

// Simple model

// Class P extends React.Component {
//     render() {
//         return (
//             <N />
//             <Route path="{current}/a" component={AV}/>
//             <Route path="{current}/b" component={BV}/>
//         )
//     }
// }

// Class N extends React.Component {
//     render() {
//         return (
//             <nav>
//                 <A />
//                 <B />
//             </nav>
//         )
//     }
// }

// class A extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h2>A</h2>
//             </div>
//         )
//     }
// }

// class B extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h2>B</h2>
//             </div>
//         )
//     }
// }

// class AV extends React.Component {
//     render() {
//         return (
//             <button>Click</button>
//         )
//     }
// }

// class BV extends React.Component {
//     render() {
//         return (
//             <button>Clack</button>
//         )
//     }
// }


