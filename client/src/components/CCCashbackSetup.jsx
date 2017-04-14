import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CashbackCategory from './CashbackCategory';

import { createCashbackCategoryKickoff } from '../actions/createcashbackcategory';

class CCCashbackSetup extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
  }

  render () {
    var creditcard = this.props.creditcard;
    var ccid = creditcard.ccid;

    var name = 'testing';
    var percent = 50;
    
    console.log(ccid, name, percent);

    return (
      <div>
        <h3>{ creditcard.ccname }</h3>
        <ul>
          { creditcard.categories.map( (category, index) => { 
            return (<li key={index}><CashbackCategory cc={ccid} category={category}/></li>)
          }) }
          <li>
            Category: <input type="text"/> 
            Cashback %: <input type="number"/> 
            <button onClick={(e) => {this.props.createCashbackCategoryKickoff(ccid, name, percent)}}>Add</button>
          </li>
        </ul>
        

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // cashbackcategories: state.cashbackcategories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCashbackCategoryKickoff: (ccid, name, percent) => { dispatch(createCashbackCategoryKickoff(ccid, name, percent)); },
    handleCategoryChange: (val) => { dispatch(handleCategoryChange(val)); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashbackSetup);




