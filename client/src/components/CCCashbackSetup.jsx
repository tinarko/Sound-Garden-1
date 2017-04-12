import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import cashbackpercent from '../actions/cashbackpercent';

class CCCashbackSetup extends React.Component {
  constructor (props) {
    super(props);
  }

  // componentWillMount() {
  //   this.props.dispatch(creditcards.getCreditcards());
  // }

  render () {

    console.log('props', this.props);

    return (
      <div>
        { this.props.creditcard.ccname }
        <p>{this.props.cashbackpercent} %
          <button onClick={this.props.handleDecrement}>-</button>
          <button onClick={this.props.handleIncrement}>+</button>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cashbackpercent: state.cashbackpercent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrement: () => { dispatch(cashbackpercent.incrementCashbackPercent()); },
    handleDecrement: () => { dispatch(cashbackpercent.decrementCashbackPercent()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashbackSetup);

// export default CCCashbackSetup;
