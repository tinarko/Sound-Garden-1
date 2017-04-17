import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import Markers from './Markers.jsx';
import Axis from './Axis.jsx';
import ToolTip from './ToolTip.jsx';
import * as transactions from './../actions/transactions.js';

class TransactionsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
  }

  showToolTip (e) {
    // TODO: refactor to action
    this.props.dispatch(transactions.showToolTip(e));
  }

  hideToolTip (e) {
    this.props.dispatch(transactions.hideToolTip(e));
  }

  render() {
    // styles generally from props
    const styles = {
      width: 800,
      height: 300,
    };
    const margin = {top: 5, right: 50, bottom: 20, left: 50};
    const w = styles.width - (margin.left + margin.right);
    const h = styles.height - (margin.top + margin.bottom);
    const transform = `translate(${margin.left}, ${margin.top})`;

    const parseDate = d3.timeParse('%Y-%m-%d');
    this.props.data.forEach(function(d, i) {
      d.date = parseDate(d.date);
    });

    // x and y are scales for the data (line)
    const x = d3.scaleTime()
      .domain(d3.extent(this.props.data, function(d) {
        return d.date;
      }))
      .range([0, w]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.props.data, function(d) {
        return d.amount;
      })])
      .range([h, 0]);

    const yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10)
      .tickSize(-w);
    const xAxis = d3.axisBottom()
      .scale(x)
      .ticks(10);
      // .tickValues(this.props.data.map(function(d, i) {
      //   return d.date;
      // }))
    const cValue = function(d) {return d.insitution_name;};
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    return (
      <div>
        <svg width={styles.width} height={styles.height}>
          <g transform={transform}>
            <Markers 
              data={this.props.data} 
              x={x} 
              y={y}
              showToolTip={this.showToolTip}
              hideToolTip={this.hideToolTip}
            />
            <ToolTip tooltip={this.props.tooltip} />*/}
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
          </g>
        </svg>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    tooltip: state.transactions.tooltip
  };
})(TransactionsGraph);