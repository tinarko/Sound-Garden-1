import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CreditCard from './CreditCard.jsx'
import MapCalculator from './MapCalculator.jsx';

import { createCreditcardsKickoff, toggleCashbackSetup, getCreditcards } from '../actions/creditcards';

//styling
import RaisedButton from 'material-ui/RaisedButton';

class CCCashback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.createCreditcardsKickoff();
  }

  componentDidMount () {
  }

  render () {
    var creditcards = this.props.creditcards.cc.map( (cc, index) => {
              return (<CreditCard 
                className="component" 
                creditcard={cc} 
                key={index} 
                ccindex={index}
                />);
            });

    var mapcalculator = this.props.mapcalculator;
    var ccName = mapcalculator.ccName;

    if (this.props.creditcards.cashbacksetup) {
      return (
        <div>
          <h1>Credit Card Selector - Setup</h1>
          <br/>
          <RaisedButton label="Back" onClick={this.props.toggleCashbackSetup} />
          <ul>
            { creditcards }
          </ul>
          <br/>
          
        </div> );
    } else if (creditcards.length === 0) {
        return (
        <div>
          <h1>Credit Card Selector</h1>
          <h3> Please add some accounts! </h3>
          <br/>
          <h3>Are you at {mapcalculator.bizName}? </h3>
          <br/>
          <p>If so, please use: </p>
          <h5>{mapcalculator.ccName}</h5>
          <p> ...for <em>{mapcalculator.cashbackPercent}%</em> cash back on: </p>
          <h5>{mapcalculator.cashbackCategory}!</h5>
          <br/>
          <RaisedButton label="Setup" onClick={this.props.toggleCashbackSetup} />
          <MapCalculator />
        </div> 
        );
    } else if (ccName == 'anything') {
        return (
        <div>
          <h1>Credit Card Selector</h1>
          <br/>
          <h3>Are you at {mapcalculator.bizName}? </h3>
          <br/>
          <p>If so, please use: </p>
          <h5>{mapcalculator.ccName}</h5>
          <p> for <em>{mapcalculator.cashbackPercent}%</em> cash back on </p>
          <h5>{mapcalculator.cashbackCategory}!</h5>
          <br/>
          <h3> Please setup some cashback categories for your credit cards, below: </h3>
          <RaisedButton label="Setup" onClick={this.props.toggleCashbackSetup} />
          <MapCalculator />
        </div> 
        );
    } else {
        return (
        <div>
          <h1>Credit Card Selector</h1>
          <br/>
          <h3>Are you at {mapcalculator.bizName}? </h3>
          <br/>
          <p>If so, please use: </p>
          <h5>{mapcalculator.ccName}</h5>
          <p> for <em>{mapcalculator.cashbackPercent}%</em> cash back on </p>
          <h5>{mapcalculator.cashbackCategory}!</h5>
          <br/>
          <RaisedButton label="Setup" onClick={this.props.toggleCashbackSetup} />
          <MapCalculator />
        </div> 
        );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    creditcards: state.creditcards,
    mapcalculator: state.mapcalculator,
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCreditcardsKickoff: () => { dispatch(createCreditcardsKickoff()); },
    toggleCashbackSetup: () => {dispatch(toggleCashbackSetup()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashback);
