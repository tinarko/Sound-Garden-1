import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import BudgetBulletChart from './BudgetBulletChart.jsx';
import MonthPicker from 'react-month-picker/lib/month-picker.js';
import BudgetCategoryList from './BudgetCategoryList.jsx';
import { getUserBudgets, getTransactionData, incrementBudget, decrementBudget, 
  postUpdatedBudget, yearMonthChange, toggleYearMonthSelection } from './../../actions/budget.js';

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';

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
      <div className='budget component'>
      <div className='graphPosition'> </div>
        <div className = 'topSegment'>
          <h1>
            <img className='componentIcon' src='data:image/png;base64,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'/> Budgets
          </h1>
          <div className="box">
            <label className='monthLabel'> {currentTime} </label>
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