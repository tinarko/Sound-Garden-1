import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import CashbackCategory from './CashbackCategory';

import { createCashbackCategoryKickoff } from '../actions/createcashbackcategory';
// import { handleCategoryChange } from '../actions/createcashbackcategory';

import RaisedButton from 'material-ui/RaisedButton';

class CreditCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      catname: '',
      number: 0
    };
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
      <div>
        <br/>
        <li>
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
              <p>• Category: 
                <input type="text" 
                       value={this.props.catname} 
                       onChange={ (e) => { this.handleCategoryChange(e.target.value) } }/> 
                Cashback %: 
                <input type="number"
                       value={this.props.number}
                       onChange={ (e) => { this.handlePercentChange(e.target.value) } }/> 
                <button onClick={ (e) => 
                  { this.props.createCashbackCategoryKickoff(
                    this.props.ccindex, ccid, this.state.catname, this.state.number) } }>Add
                </button>
              </p>
            </li>
          </ul>
        </li>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
// };

const mapDispatchToProps = (dispatch) => {
  return {
    createCashbackCategoryKickoff: (ccindex, ccid, name, percent) => { dispatch(createCashbackCategoryKickoff(ccindex, ccid, name, percent)); },
    // handleCategoryChange: (catname) => { dispatch(handleCategoryChange(catname)); },
    // handlePercentChange: (percent) => { dispatch(handlePercentChange(percent)); }
  };
};

export default connect (null, mapDispatchToProps) (CreditCard);




                // <RaisedButton label="Add" onClick={ (e) => 
                //   { this.props.createCashbackCategoryKickoff(
                //     this.props.ccindex, ccid, this.state.catname, this.state.number) } } />
