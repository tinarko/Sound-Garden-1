import React from 'react';
import ReactDOM from 'react-dom';
import BudgetCategories from './BudgetCategories.jsx';
import { connect } from 'react-redux';
import { getUserBudgets } from '../actions/budget.js';

class BudgetCategoryList extends React.Component {
  constructor (props) {
    super(props);
    console.log('this.props in BudgetList', this.props);
  }

  componentWillMount () {
    let { dispatch, getBudgets, receivedUserBudgets } = this.props;
    // this.props.getBudgets(1);
    console.log('this.props in BudgetList2', this.props);
    // this.getUserBudgets(1);
  }

  componentDidMount () {
    // this.props.getBudgets(1);
    console.log('this.props in componentDidMount', this.props);
  }

  render () {

    let month = 'April'; 

    return (
      <div>
        <h2> Budget for {month} </h2>
        
      </div>

    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     budgetcategories: state.budget.budgets
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getBudgets: (userid) => { dispatch(getUserBudgets(userid)); },
//     // receivedUserBudgets: () => {dispatch(receivedUserBudgets())}
//   };
// };
export default BudgetCategoryList;
// export default connect (mapStateToProps, mapDispatchToProps) (BudgetCategoryList);