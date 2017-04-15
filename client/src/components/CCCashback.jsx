import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CreditCard from './CreditCard.jsx'

import { getCreditcards, toggleCashbackSetup } from '../actions/creditcards';

class CCCashback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.getCreditcards();
  }

  render () {
    var creditcards = this.props.creditcards.cc.map( (cc, index) => {
              return (<CreditCard creditcard={cc} key={index} ccindex={index}/>);
            });

    if (this.props.creditcards.cashbacksetup) {

      return (
        <div>
          <h1>Credit Card Selector - Setup</h1>
          <button onClick={this.props.toggleCashbackSetup}>Select Credit Card for Max Cashback</button>
          <ul>
            { creditcards }
          </ul>
          
        </div> );
    } else {
        return (
        <div>
          <h1>Credit Card Selector</h1>
          <h3>Are you at this location? --insert business name-- </h3>
          <h4>If so, please use your --insert credit card-- to get the most cash back!</h4>
          <h4>If not, please indicate where you are on the map below:</h4>
          <p>Map Placeholder</p>
          
          <button onClick={this.props.toggleCashbackSetup}>Credit Card Cashback % Setup</button>
        </div> );
    }

  }
}

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
