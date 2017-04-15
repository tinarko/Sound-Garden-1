import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CashbackCategory from './CashbackCategory';

import { createCashbackCategoryKickoff } from '../actions/createcashbackcategory';
// import { handleCategoryChange } from '../actions/createcashbackcategory';

class CreditCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      catname: '',
      number: 0
    };
  }

  componentWillMount () {
    // console.log(this.props);
  }

  handleCategoryChange (catname) {
    this.setState({catname: catname});
  }

  handlePercentChange (percent) {
    percent = Number(percent);
    this.setState({number: percent});
  }

  render () {
    var creditcard = this.props.creditcard;
    var ccid = creditcard.ccid;
    
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
            Category: 
            <input type="text" 
                   value={this.props.catname} 
                   onChange={ (e) => { this.handleCategoryChange(e.target.value) } }/> 
            Cashback %: 
            <input type="number"
                   value={this.props.number}
                   onChange={ (e) => { this.handlePercentChange(e.target.value) } }/> 
            <button 
              onClick={ (e) => 
              { this.props.createCashbackCategoryKickoff(this.props.ccindex, ccid, this.state.catname, this.state.number) } }>
              Add
            </button>
          </li>
        </ul>
      </div>
      </li>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state', state);
  // return {
  //   percent: state.percent,
  //   catname: state.catname
  // };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCashbackCategoryKickoff: (ccindex, ccid, name, percent) => { dispatch(createCashbackCategoryKickoff(ccindex, ccid, name, percent)); },
    // handleCategoryChange: (catname) => { dispatch(handleCategoryChange(catname)); },
    // handlePercentChange: (percent) => { dispatch(handlePercentChange(percent)); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CreditCard);




