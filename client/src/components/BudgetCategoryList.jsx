import React from 'react';
import ReactDOM from 'react-dom';
import BudgetCategory from './BudgetCategory.jsx';
import { connect } from 'react-redux';
import { toggleAddBudgetCategoryInput } from '../actions/budget.js';

class BudgetCategoryList extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    let { dispatch, toggleAddBudgetCategoryInput} = this.props;
  }


  render () {

    let month = 'April';
    let toggleButtonForm = null;
    if (this.props.budget.showaddbudgetcategoryform) {
      toggleButtonForm = <form onSubmit= {(e) => this.props.toggleAddBudgetCategoryInput()}>
          <label> 
          Category Name:
            <input type="text"/>
          </label>
          <label> 
          Budget Amount: 
            <input type="text"/>
          </label>
          <input type="submit" value="Submit"/>
        </form>;
    } else {
      toggleButtonForm = <button onClick = {(e) => { this.props.toggleAddBudgetCategoryInput(); } }> Add Category </button>;
    }

    return (
      <div>
        <h2> Budget for {month} </h2>
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
                                 handleChange={this.props.handleChange}/>;
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
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (BudgetCategoryList);
// export default BudgetCategoryList;