import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CCCashbackSetup from './CCCashbackSetup.jsx'

import { getCreditcards } from '../actions/creditcards';
import { toggleCashbackSetup } from '../actions/creditcards';

class CCCashback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.getCreditcards();
  }

  render () {
    var creditcards = this.props.creditcards.creditcards.map( (creditcard, index) => {
              return (<li><CCCashbackSetup creditcard={creditcard} key={index}/></li>);
            });

    if (this.props.creditcards.cashbacksetup) {

      return (
        <div>
          <h1>Credit Card Selector</h1>
          <button onClick={this.props.toggleCashbackSetup}>Credit Card Cashback % Setup</button>
          <ul>
            { creditcards }
          </ul>
          
        </div> );
    } else {
        return (
        <div>
          <h1>Credit Card Selector</h1>
          <button onClick={this.props.toggleCashbackSetup}>Credit Card Cashback % Setup</button>
        </div> );
    }

  }
}
          // {creditcards}

        // <CCSuggestion/>
        // <GoogleMap />

const mapStateToProps = (state) => {
  return {
    creditcards: state.creditcards,
    cashbacksetup: state.cashbacksetup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCreditcards: () => { dispatch(getCreditcards()); },
    toggleCashbackSetup: () => {dispatch(toggleCashbackSetup()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashback);
