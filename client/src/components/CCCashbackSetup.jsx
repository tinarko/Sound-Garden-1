import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CashbackCategory from './CashbackCategory';

import { getCashbackCategories } from '../actions/cashbackcategories.js';

class CCCashbackSetup extends React.Component {
  constructor (props) {
    super(props);
  }

componentWillMount () {
    var ccid = this.props.creditcard.id;
    this.props.getCashbackCategories(ccid);
  }

  render () {
    var cashbackcategories = this.props.cashbackcategories.cashbackcategories;
    console.log('ccid', this.props.creditcard.id);
    console.log('cashbackcategories', cashbackcategories);
    return (
      <div>
        <h3>{ this.props.creditcard.ccname }</h3>
        <ul>
          { cashbackcategories.map( (cashbackcategory, index) => { 
            return (<li><CashbackCategory cashbackcategory={cashbackcategory} key={index}/></li>)
          }) }
          
        </ul>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cashbackcategories: state.cashbackcategories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCashbackCategories: (ccid) => { dispatch(getCashbackCategories(ccid)); }
  };
};

// export default connect (mapDispatchToProps) (CCCashbackSetup);
export default connect (mapStateToProps, mapDispatchToProps) (CCCashbackSetup);




