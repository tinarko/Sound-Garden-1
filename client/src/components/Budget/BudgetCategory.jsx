import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { incrementBudget, decrementBudget } from './../../actions/budget.js';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import Trash from 'material-ui/svg-icons/action/delete';

import BudgetBulletChart from './BudgetBulletChart.jsx';

class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let actualValue = this.props.budgetcategory.actualvalue || 0;
    return (
      <div className='budgetCategory component'>
        <h3>{this.props.budgetcategory.name} 
        <IconButton onClick={(e) => { this.props.handleBudgetChange(
          0, 
          this.props.budgetcategory.name, 
          this.props.index, 
          'delete',
          this.props.year,
          this.props.month); 
        } }> 
            <Trash/> 
         </IconButton>
         </h3> 

        <div className='individualAmounts'>
          <p>Budget Goal: 
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
          </p>
        </div>
        <div>
          <p> Spent this Month: ${actualValue} </p>
          </div>
          <br />
                
          <br />
          <br /> 
          <br />
          <br />
        
      </div>

    );
  }
}



export default BudgetCategory;