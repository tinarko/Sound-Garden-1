import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import BudgetBulletChart from './BudgetBulletChart.jsx';
import MonthPicker from 'react-month-picker/lib/month-picker.js';
import BudgetCategoryList from './BudgetCategoryList.jsx';
import BudgetFriends from './BudgetFriends.jsx';
import { getUserBudgets, getTransactionData, incrementBudget, decrementBudget, 
  postUpdatedBudget, yearMonthChange, toggleYearMonthSelection } from '../actions/budget.js';
// import { getTransactionData } from '../actions/transactions.js';

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';

// import d3BulletChart from '../d3BulletChart.js';
// import * as d3 from 'd3';


class Budget extends React.Component {
  constructor (props) {
    super(props);
    
    let today = new Date ();
    let monthValue = today.getMonth() + 1;
    let yearValue = today.getFullYear();
    this.props.yearMonthChange({year: yearValue, month: monthValue});

    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0'.concat(month);
    }
    let year = today.getFullYear().toString();

    this.props.getBudgets(year, month);
    this.props.getTransactionData(year, month);

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
    // var el = ReactDOM.findDOMNode(this);
    // d3BulletChart.create(el, this.props);

  }

  handleAMonthDismiss (value) {
    this.props.yearMonthChange(value);

    var monthString;
    if (value.month < 10) {
      monthString = '0'.concat(value.month);
    } else {
      monthString = value.month.toString();
    }
    var yearString = value.year.toString();

    this.props.getBudgets(yearString, monthString);
    this.props.getTransactionData(yearString, monthString);
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
    let currentTime = currentMonth + ' ' + this.props.budget.mvalue.year; 


    return (
      <div className='budget'>
      <div className='graphPosition'> </div>
        <div className = 'topSegment'>
         <h1>Budget</h1>
          <div className="box">
            <label> {currentTime} </label>
            <IconButton onClick={this.handleClickCurrent.bind(this)}>
              <ActionDateRange/>
            </IconButton>
            <MonthPicker 
              ref="pickAMonth" 
              years={3}
              value={this.props.budget.mvalue}
              lang ={months}
              onDismiss={this.handleAMonthDismiss.bind(this)}>
            </MonthPicker>
          </div>
          </div>
        <BudgetCategoryList budget= {this.props.budget} handleBudgetChange={this.props.handleBudgetChange} toggleAddBudgetCategoryInput={this.props.toggleAddBudgetCategoryInput}/> 
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    budget: state.budget,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudgets: (year, month) => { dispatch(getUserBudgets(year, month)); },
    getTransactionData: (year, month) => { dispatch(getTransactionData(year, month)); },
    handleBudgetChange: (goalvalue, categoryname, index, change, year, month) => { 
      dispatch(postUpdatedBudget(goalvalue, categoryname, index, change, year, month)); 
    },
    yearMonthChange: (yearMonthObject) => { dispatch(yearMonthChange(yearMonthObject)); },
    toggleYearMonthSelection: () => { dispatch (toggleYearMonthSelection()); },
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Budget);