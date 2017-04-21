import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CreditCard from './CreditCard.jsx'
import GoogleMap from './GoogleMap.jsx';

import { createCreditcardsKickoff, toggleCashbackSetup, getCreditcards } from '../actions/creditcards';

//styling
import RaisedButton from 'material-ui/RaisedButton';

class CCCashback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.createCreditcardsKickoff();
  }

  // componentWillMount () {
  //   this.props.getCreditcards();
  // }

  render () {
    var creditcards = this.props.creditcards.cc.map( (cc, index) => {
              return (<CreditCard 
                className="component" 
                creditcard={cc} 
                key={index} 
                ccindex={index}
                />);
            });

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
    } else {
        return (
        <div>
          <h1>Credit Card Selector</h1>
          <br/>
          <h3>Are you at this location? //business name// </h3>
          <br/>
          <p>If so, please use your //credit card// for // X // % cash back!</p>
          <br/>
          <RaisedButton label="Setup" onClick={this.props.toggleCashbackSetup} />
          <GoogleMap />
        </div> 
        );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    creditcards: state.creditcards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCreditcardsKickoff: () => { dispatch(createCreditcardsKickoff()); },
    toggleCashbackSetup: () => {dispatch(toggleCashbackSetup()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashback);
