import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CCCategories from './CCCategories';

class CCCashbackSetup extends React.Component {
  constructor (props) {
    super(props);
  }

componentWillMount () {
    console.log('PROPs!', this.props);
  }

  render () {
    return (
      <div>
        <h3>{ this.props.creditcard.ccname }</h3>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // cashbackpercent: state.cashbackpercent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // handleIncrement: () => { dispatch(cashbackpercent.incrementCashbackPercent()); },
    // handleDecrement: () => { dispatch(cashbackpercent.decrementCashbackPercent()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashbackSetup);

// export default CCCashbackSetup;
