import React from 'react'; 
import ReactDOM from 'react-dom';
import d3BulletChart from './../../d3BulletChart.js';
import * as d3 from 'd3';

class BudgetBulletChart extends React.Component {

  componentDidUpdate () {
    console.log('this.props in BudgetBullet DidUpdate', this.props);
    var el = ReactDOM.findDOMNode(this);
      d3BulletChart.create(el, this.props);
  }
  render () {
    return (
      <div className='chart'> </div>
    );
  }
}

export default BudgetBulletChart;