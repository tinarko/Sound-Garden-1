import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CashbackCategory from './CashbackCategory.jsx';
import { createCashbackCategoryKickoff, getCashbackCategoriesKickoff } from './../../actions/createcashbackcategory.js';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle';


class CreditCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      catname: '',
      number: 0
    };
  }

  componentWillMount () {
    var ccid = this.props.creditcard.ccid;
    this.props.getCashbackCategoriesKickoff(ccid);
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
    var categories = creditcard.categories;
    var ccid = creditcard.ccid;
    var ccindex = this.props.ccindex;
    
    return (
      <div>
        <br/>
        <br/>
        <li>
          <h3>{ creditcard.ccname }</h3>
          <br/>
          <ul>
            {categories.map((category, index) => {
              return (
                <CashbackCategory 
                  key={index} 
                  catindex={index} 
                  category={category} 
                  ccid={ccid}
                  ccindex={ccindex}
                />
              );
            })}
            <li>
              <p>Category: 
                <input type="text" 
                       value={this.props.catname} 
                       onChange={ (e) => { this.handleCategoryChange(e.target.value) } }/> 
                Cashback %: 
                <input type="number"
                       value={this.props.number}
                       onChange={ (e) => { this.handlePercentChange(e.target.value) } }/> 
                <IconButton
                onClick={ (e) => 
                  { this.props.createCashbackCategoryKickoff(
                    this.props.ccindex, ccid, this.state.catname, this.state.number) } }>Add
                >
                  <Add />
                </IconButton>


              </p>
            </li>
          </ul>
        </li>
      </div>
    );
  }
}


// const mapStateToProps = (state) => {
// };

const mapDispatchToProps = (dispatch) => {
  return {
    createCashbackCategoryKickoff: (ccindex, ccid, name, percent) => { 
      dispatch(createCashbackCategoryKickoff(ccindex, ccid, name, percent)); 
    },
    // handleCategoryChange: (catname) => { dispatch(handleCategoryChange(catname)); },
    // handlePercentChange: (percent) => { dispatch(handlePercentChange(percent)); }
    getCashbackCategoriesKickoff: (ccid) => { dispatch(getCashbackCategoriesKickoff(ccid)); }
  };
}

export default connect (null, mapDispatchToProps) (CreditCard);

