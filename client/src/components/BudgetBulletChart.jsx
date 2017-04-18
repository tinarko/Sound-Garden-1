import d3BulletChart from '../d3BulletChart.js';
import React from 'react'; 
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class BudgetBulletChart extends React.Component {

  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    d3BulletChart.create(el);
  }

  render () {
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