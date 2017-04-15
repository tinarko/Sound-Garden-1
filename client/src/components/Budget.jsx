import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MonthPicker from 'react-month-picker/lib/month-picker.js';
// import MonthPicker from 'month-picker';
import BudgetCategoryList from './BudgetCategoryList.jsx';
import { getUserBudgets, getTransactionData, incrementBudget, decrementBudget, postUpdatedBudget, yearMonthChange, toggleYearMonthSelection } from '../actions/budget.js';
// import { getTransactionData } from '../actions/transactions.js';

class Budget extends React.Component {
  constructor (props) {
    super(props);
    
    let today = new Date ();
    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0'.concat(month);
    }
    let year = today.getFullYear().toString();
    this.props.getBudgets(year, month);
    this.props.getTransactionData(year, month);

    let monthValue = today.getMonth() + 1;
    let yearValue = today.getFullYear();
    this.props.yearMonthChange({year: yearValue, month: monthValue});
    // this.props.yearMonthChange({year: 2016, month: 1});
    // this.props.yearMonthChange(2016, 1);
    // this.props.yearMonthChange = this.props.yearMonthChange.bind(this);


  }

  componentWillMount () {

    let today = new Date ();
    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0'.concat(month);
    }
    let year = today.getFullYear().toString();

    this.props.getBudgets(year, month);
    this.props.getTransactionData(year, month);
  }

  handleAMonthDismiss (value) {
    console.log('invoked dismiss');
    console.log('value', value);
    this.props.yearMonthChange(value);
  }

  handleYearMonthChange (value) {
    console.log('invoked change');
    this.props.yearMonthChange(value);
  }

  handleClickCurrent () {
    this.refs.pickAMonth.show();
  }
  render () {

    let today = new Date ();
    let monthValue = (today.getMonth) + 1;
    let yearValue = today.getFullYear();
    let mvalue = {year: yearValue, month: monthValue};
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let currentMonth = months[(this.props.budget.mvalue.month - 1)];

    var yearMonthSelector;
    // if (this.props.budget.toggleyearmonthselection) {
    //   yearMonthSelector = <MonthPicker 
    //       ref="pickAMonth" 
    //       years={3}
    //       value={this.props.budget.mvalue}
    //       lang ={months}
    //       onChange = {}
    //       onDismiss={this.handleAMonthDismiss}>
    //       </MonthPicker>;
    // } else {
    //   yearMonthSelector = <div></div>;
    // }
    return (
      <div>
       <h2> Budget</h2>
        <div className="box" onClick = {this.handleClickCurrent.bind(this)}>
          <label>{this.props.budget.mvalue.month} {this.props.budget.mvalue.year} </label>
        </div>
        <MonthPicker 
          ref="pickAMonth" 
          years={3}
          value={this.props.budget.mvalue}
          lang ={months}
       
          onDismiss={this.handleAMonthDismiss.bind(this)}>
          </MonthPicker>
        <div>
          Placeholder for Graphs
        </div>
        <BudgetCategoryList budget= {this.props.budget} handleBudgetChange={this.props.handleBudgetChange} toggleAddBudgetCategoryInput={this.props.toggleAddBudgetCategoryInput}/>
        
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    budget: state.budget,
    // transactions: state.transactions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudgets: (year, month) => { dispatch(getUserBudgets(year, month)); },
    getTransactionData: (year, month) => { dispatch(getTransactionData(year, month)); },
    handleBudgetChange: (goalvalue, categoryname, index, change) => { 
      dispatch(postUpdatedBudget(goalvalue, categoryname, index, change)); 
    },
    yearMonthChange: (yearMonthObject) => { dispatch(yearMonthChange(yearMonthObject)); },
    toggleYearMonthSelection: () => { dispatch (toggleYearMonthSelection()); }
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Budget);