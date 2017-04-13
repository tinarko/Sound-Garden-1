import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import cashbackpercent from '../actions/cashbackpercent';

class CashbackCategory extends React.Component {
  constructor (props) {
    super(props);
  }

  // componentWillMount() {
  // }

  render () {
    console.log(this.props.cashbackcategory);
    return (
      <div>
        <p>{this.props.cashbackcategory.categoryname} {this.props.cashbackcategory.value} 
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

export default connect (mapStateToProps, mapDispatchToProps) (CashbackCategory);

