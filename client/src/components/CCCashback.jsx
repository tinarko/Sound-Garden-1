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
  }

  render () {
    var creditcards = this.props.creditcards.creditcards.map( (creditcard, index) => {
              return (<li><CCCashbackSetup creditcard={creditcard} key={index}/></li>);
            });

    return (
      <div>
        <h1>Credit Card Selector</h1>
        <h3>Credit Card Cashback % Setup</h3>
        <ul>
          { creditcards }
        </ul>
        
      </div>
    );
  }
}
          // {creditcards}

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