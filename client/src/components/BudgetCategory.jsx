import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { incrementBudget, decrementBudget } from '../actions/budget.js';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';

import BudgetBulletChart from './BudgetBulletChart.jsx';

class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);
    console.log('this.props in budgetCategory', this.props);
    //<BudgetBulletChart name={this.props.budgetcategory.name}/>
  }

  render() {
    let actualValue = this.props.budgetcategory.actualvalue || 0;
    return (
      <div className='budgetCategory'>
        <h3>{this.props.budgetcategory.name} </h3>
        <br />
        <br /> 
        <br />
        <br />
        <div className='individualAmounts'>
        Budget Goal: 
        <IconButton onClick={(e) => { this.props.handleBudgetChange(
          this.props.budgetcategory.goalvalue, 
          this.props.budgetcategory.name, 
          this.props.index, 
          'decrement',
          this.props.year,
          this.props.month); 
        } }> 
          <ContentRemoveCircleOutline/>
        </IconButton>
        ${this.props.budgetcategory.goalvalue}
        <IconButton onClick={(e) => { this.props.handleBudgetChange(
          this.props.budgetcategory.goalvalue, 
          this.props.budgetcategory.name, 
          this.props.index, 
          'increment',
          this.props.year,
          this.props.month); 
        } }> 
          <ContentAddCircleOutline/>
        </IconButton> 

        </div>
        <div>
        Spent this Month: ${actualValue}
        </div>
        <br />
        
      </div>

    );
  }
}



export default BudgetCategory;