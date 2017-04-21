import React from 'react'; 
import ReactDOM from 'react-dom';
import d3BulletChart from '../d3BulletChart.js';
import * as d3 from 'd3';

class BudgetBulletChart extends React.Component {

  // constructor (props) {
  //   super(props);
  //   console.log('this.props in BudgetBulletChart1', this.props);
  // }

  //uncommenting this shows graph, but only with dummy data
  //this.props is not correct at this point
  componentDidMount() {
    console.log('this.props in BudgetBullet DidMount', this.props);
    // var el = ReactDOM.findDOMNode(this);
    // console.log('el', el);
    // // if (this.props.budget.budgets.length > 0) {
    //   d3BulletChart.create(el, this.props);
    // // }
  }

  //uncommenting this shows graph. but only with dummy data (without if condition)
  //this.props does show correctly at this point
  componentDidUpdate () {
    console.log('this.props in BudgetBullet DidUpdate', this.props);
    var el = ReactDOM.findDOMNode(this);
    console.log('el', el);
    // if (this.props.budget.budgets.length > 0) {
      d3BulletChart.create(el, this.props);
      // d3BulletChart.create(el, this.props);
    // }
  }
  render () {
    console.log('this.props in BudgetBullet Render', this.props);
    // var el = ReactDOM.findDOMNode(this);
    // console.log('el', el);
    // d3BulletChart.create(el, this.props);
    return (
      <div className='chart'> </div>
    );
  }
}

export default BudgetBulletChart;

// var BudgetBulletChart = React.createClass ({

//   componentDidMount: function() {
//     var el = ReactDOM.findDOMNode(this);
//     d3BulletChart.create(el);
//   }, 

//   render: function () {
//     return (
//       <div className='chart'> </div>
//     );
//   }
// });