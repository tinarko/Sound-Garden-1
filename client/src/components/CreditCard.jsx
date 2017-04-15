import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CashbackCategory from './CashbackCategory';

import { createCashbackCategoryKickoff } from '../actions/createcashbackcategory';
import { handleCategoryChange } from '../actions/createcashbackcategory';

class CreditCard extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    console.log(this.props);
  }

  render () {
    var creditcard = this.props.creditcard;
    var ccid = creditcard.ccid;
    var name = 'testing';
    var percent = 50;
    
    return (
      <li>
      <div>
        <h3>{ creditcard.ccname }</h3>
        <ul>
          { creditcard.categories.map( (category, index) => { 
            return (
              <CashbackCategory 
                ccindex={this.props.key} 
                key={index} 
                ccindex={this.props.ccindex} 
                catindex={index} 
                category={category}
                catid={category.catid}
              />
            )
          }) }
          <li>
            Category: <input type="text" name="catname" value={this.props.catname} onChange={(e)=>handleCategoryChange(e.target.value)}/> 
            Cashback %: <input type="number"/> 
            <button onClick={(e) => {this.props.createCashbackCategoryKickoff(ccid, name, percent)}}>Add</button>
          </li>
        </ul>
      </div>
      </li>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    // cashbackcategories: state.cashbackcategories
    percent: state.percent,
    catname: state.catname
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCashbackCategoryKickoff: (ccid, name, percent) => { dispatch(createCashbackCategoryKickoff(ccid, name, percent)); },
    handleCategoryChange: (catname) => { dispatch(handleCategoryChange(catname)); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CreditCard);




