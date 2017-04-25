import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
import { Provider } from 'react-redux';
import Budget from '../client/src/components/Budget.jsx';
import BudgetCategoryList from '../client/src/components/BudgetCategoryList.jsx';
import * as actions from '../client/src/actions/budget.js';
import reducer from '../client/src/reducers/budget.js';
import BudgetCategory from '../client/src/components/BudgetCategory.jsx';

describe('Budget Actions', () => {

  it('should have a FETCHING_BUDGETS action', () => {
    const expectedAction = {
      type: 'FETCHING_BUDGETS'
    };
    expect(actions.fetchingBudgets()).to.deep.equal(expectedAction);
  });

  it('should have a RECEIVED_BUDGETS action', () => {
    const expectedAction = {
      type: 'RECEIVED_BUDGETS',
      budgets: []
    };
    expect(actions.receivedUserBudgets([])).to.deep.equal(expectedAction);
  });

  it('should have a MONTH_VALUE_CHANGE action', () => {
    const expectedAction = {
      type: 'MONTH_VALUE_CHANGE',
      yearMonthObject: {year: null, month: null}
    };
    expect(actions.yearMonthChange({year: null, month: null})).to.deep.equal(expectedAction);
  });

});

describe('Budget Reducers', () => {

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
      ).to.deep.equal(
      {
        budgets: [],
        totalBudget: 0,
        totalSpent: 0,
        fetchingBudgets: false,
        error: null, 
        showaddbudgetcategoryform: false,
        addcategoryname: '',
        addcategorybudget: '',
        mvalue: {year: null, month: null},
        showMyBudgets: true,
        showFriendBudgets: false,
        friendsBudgets: []
      }
    );
  });

  it('should handle month change', () => {
    expect(
      reducer(undefined, {
        type: 'MONTH_VALUE_CHANGE',
        yearMonthObject: {year: 2017, month: 4}
      })).to.deep.equal({
        budgets: [],
        totalBudget: 0,
        totalSpent: 0,
        fetchingBudgets: false,
        error: null, 
        showaddbudgetcategoryform: false,
        addcategoryname: '',
        addcategorybudget: '',
        mvalue: {year: 2017, month: 4},
        showMyBudgets: true,
        showFriendBudgets: false,
        friendsBudgets: []
      }
    );
  });
});

describe('Budget Components', () => {

  xit('should have a header', () => {
    const wrapper = shallow(
    <Provider>
      <Budget
    getBudgets={actions.getUserBudgets}
    getTransactionData={actions.getTransactionData}
    handleBudgetChange={actions.postUpdatedBudget}
    yearMonthChange={actions.yearMonthChange}
    toggleYearMonthSelection ={actions.toggleYearMonthSelection}
    showMyBudgets={actions.showMyBudgets}
    showFriendBudgets={actions.showFriendBudgets}
    />
    </Provider>
    );
    expect(wrapper.containsMatchingElement(<h1 className='budget'>Budget</h1>)).to.equal(true);
    // expect(wrapper.contains('Budget')).toBe(true);

  });

});