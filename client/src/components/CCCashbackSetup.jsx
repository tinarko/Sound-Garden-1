import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CashbackCategory from './CashbackCategory';

class CCCashbackSetup extends React.Component {
  constructor (props) {
    super(props);
  }

componentWillMount () {
  }

  render () {
    var creditcard = this.props.creditcard;
    return (
      <div>
        <h3>{ creditcard.ccname }</h3>
        <ul>
          { creditcard.categories.map( (category, index) => { 
            return (<li><CashbackCategory cc={creditcard.ccid} category={category} key={index}/></li>)
          }) }
          <li>
            Category: <input type="text"/> 
            Cashback %: <input type="number"/> 
            <button>Add</button>
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
    getCashbackCategories: (ccid) => { dispatch(getCashbackCategories(ccid)); }
    // createCashbackCategory: (ccid) => { dispatch(createCashbackCateogryKickoff(ccid, name, percent)); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashbackSetup);




