import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import cashbackpercent from '../actions/cashbackpercent';
import creditcards from '../actions/creditcards';

class CCCashbackSetup extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(creditcards.getCreditcards());
  }

  render () {

    return (
      <div>
        <h2> CashbackSetup </h2>

        <p>{this.props.cashbackpercent}</p>
        <button onClick={this.props.handleDecrement}>-</button>
        <button onClick={this.props.handleIncrement}>+</button>
        <p>{this.props.creditcards}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cashbackpercent: state.cashbackpercent,
    creditcards: state.creditcards
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrement: () => { dispatch(cashbackpercent.incrementCashbackPercent()); },
    handleDecrement: () => { dispatch(cashbackpercent.decrementCashbackPercent()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashbackSetup);
