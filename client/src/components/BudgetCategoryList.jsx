import React from 'react';
import ReactDOM from 'react-dom';
import BudgetCategory from './BudgetCategory.jsx';
import { connect } from 'react-redux';
import { toggleAddBudgetCategoryInput, categoryNameInputChange, categoryGoalInputChange } from '../actions/budget.js';

class BudgetCategoryList extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    let { toggleAddBudgetCategoryInput} = this.props;
  }

  handleInputChange (event) {
    let { categoryNameInputChange, categoryGoalInputChange} = this.props;
    if (event.target.name === 'addcategoryname') {
      categoryNameInputChange(event.target.value);
    } else if (event.target.name === 'addcategorybudget') {
      categoryGoalInputChange(event.target.value);
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
        onSubmit= {(event) => {
          this.props.toggleAddBudgetCategoryInput();
          this.handleSubmit(event);
        }
      }>
          <label> 
          Category Name:
            <input type="text" name= "addcategoryname" value={this.props.budget.addcategoryname} onChange={this.handleInputChange.bind(this)}/>
          </label>
          <label> 
          Budget Amount: 
            <input type="text" name ="addcategorybudget" value={this.props.budget.addcategorybudget} onChange={this.handleInputChange.bind(this)}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>;
    } else {
      toggleButtonForm = <button onClick = {(e) => { this.props.toggleAddBudgetCategoryInput(); } }> Add Category </button>;
    }

    return (
      <div>
        <div>
        Total Spent: {this.props.budget.totalSpent}
        </div>
        <div>
        Total Budget: {this.props.budget.totalBudget}
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

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddBudgetCategoryInput: () => { dispatch(toggleAddBudgetCategoryInput()); },
    categoryNameInputChange: (categoryName) => { dispatch(categoryNameInputChange(categoryName)); },
    categoryGoalInputChange: (goalValue) => { dispatch(categoryGoalInputChange(goalValue)); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (BudgetCategoryList);
// export default BudgetCategoryList;