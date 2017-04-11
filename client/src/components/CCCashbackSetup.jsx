import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import cashbackpercent from '../actions/cashbackpercent';

class CCCashbackSetup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    return (
      <div>
        <h2> CashbackSetup </h2>

        <p>{this.props.cashbackpercent}</p>
        <button onClick={this.props.handleDecrement}>-</button>
        <button onClick={this.props.handleIncrement}>+</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cashbackpercent: state.cashbackpercent
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrement: () => { dispatch(cashbackpercent.incrementCashbackPercent()); },
    handleDecrement: () => { dispatch(cashbackpercent.decrementCashbackPercent()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashbackSetup);