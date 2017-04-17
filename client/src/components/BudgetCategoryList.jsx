import React from 'react';
import ReactDOM from 'react-dom';
import BudgetCategory from './BudgetCategory.jsx';
import { connect } from 'react-redux';
import { toggleAddBudgetCategoryInput, categoryNameInputChange, categoryGoalInputChange } from '../actions/budget.js';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class BudgetCategoryList extends React.Component {
  constructor (props) {
    super(props);
  }

  handleInputChange (event) {
    if (event.target.name === 'addcategoryname') {
      this.props.categoryNameInputChange(event.target.value);
    } else if (event.target.name === 'addcategorybudget') {
      this.props.categoryGoalInputChange(event.target.value);
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.handleBudgetChange(
      this.props.budget.addcategorybudget, 
      this.props.budget.addcategoryname, 
      this.props.budget.budgets.length, 
      'newValue', 
      this.props.budget.mvalue.year,
      this.props.budget.mvalue.month);
  }
  
  render () {

    // let month = 'April';
    let toggleButtonForm = null;
    if (this.props.budget.showaddbudgetcategoryform) {
      toggleButtonForm = <form 
        onSubmit= {(e) => {
          this.props.toggleAddBudgetCategoryInput();
          this.handleSubmit(e);
        }
      }>
          <label> 
          Category Name:
            <TextField type="text" name= "addcategoryname" hintText="Ex: Housing" value={this.props.budget.addcategoryname} onChange={this.handleInputChange.bind(this)}/>
          </label>
          <br/>
          <label> 
          Budget Amount: 
            <TextField type="text" name ="addcategorybudget" hintText="$" value={this.props.budget.addcategorybudget} onChange={this.handleInputChange.bind(this)}/>
          </label>
          <RaisedButton label ='Submit' type ="submit"/>
        </form>;
    } else {
      toggleButtonForm = <RaisedButton label= 'Add Category' onClick={(e) => { this.props.toggleAddBudgetCategoryInput(); } } />;
    }

    return (
      <div>
        <div>
        Total Spent: ${this.props.budget.totalSpent}
        </div>
        <div>
        Total Budget: ${this.props.budget.totalBudget}
        </div>
        <br />
        <div>
        {this.props.budget.budgets.map ((budgetcategory, index) => {
          return <BudgetCategory budgetcategory = {budgetcategory}
                                 index = {index} 
                                 handleBudgetChange={this.props.handleBudgetChange}
                                 year = {this.props.budget.mvalue.year}
                                 month ={this.props.budget.mvalue.month}/>;
        }) }
        </div> 
        {toggleButtonForm}
    </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddBudgetCategoryInput: () => { dispatch(toggleAddBudgetCategoryInput()); },
    categoryNameInputChange: (categoryName) => { dispatch(categoryNameInputChange(categoryName)); },
    categoryGoalInputChange: (goalValue) => { dispatch(categoryGoalInputChange(goalValue)); }
  };
};

export default connect (null, mapDispatchToProps) (BudgetCategoryList);
// export default BudgetCategoryList;