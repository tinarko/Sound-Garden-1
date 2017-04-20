import React from 'react'; 
import ReactDOM from 'react-dom';
import d3BulletChart from '../d3BulletChart.js';
import * as d3 from 'd3';

class BudgetBulletChart extends React.Component {

  constructor (props) {
    super(props);
    console.log('this.props in BudgetBulletChart1', this.props);
  }
  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    console.log('el', el);
    console.log('this.props in BudgetBullet2 Component', this.props);
    d3BulletChart.create(el, this.props);
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