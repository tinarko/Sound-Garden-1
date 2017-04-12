import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CCCashbackSetup from './CCCashbackSetup.jsx'
import { getCreditcards } from '../actions/creditcards';

class CCCashback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    let { dispatch, getCreditcards } = this.props;
    let userid = this.props.userid || 2;
    getCreditcards(userid);
    // this.getUserBudgets(1);
  }

  render () {
    console.log('props creditcards', this.props.creditcards);
    return (
      <div>

        <h1>Credit Card Selector</h1>

        <h3>Setup</h3>
        
      </div>
    );
  }
}

        // {this.props.creditcards.map((creditcard) => {
        //   return <CCCashbackSetup creditcard={creditcard}/>
        // })}
        // <CCSuggestion/>
        // <GoogleMap />

const mapStateToProps = (state) => {
  console.log('state', state.creditcards);
  return {
    creditcards: state.creditcards
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCreditcards: () => { dispatch(getCreditcards()); }
  };
};


export default connect (mapStateToProps, mapDispatchToProps) (CCCashback);