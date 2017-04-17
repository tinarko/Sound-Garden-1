import React from 'react';
import * as d3 from 'd3';
import Markers from './Markers.jsx';
import Axis from './Axis.jsx';
import ToolTip from './ToolTip.jsx';

class TransactionsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: {
        display: false,
        data: {
          key: '',
          value: '',
        }
      }
    };
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
  }

  showToolTip (e) {
    // TODO: refactor to action
    this.setState({
      tooltip: {
        display: true,
        data: {
          key: e.target.getAttribute('data-key'),
          value: e.target.getAttribute('data-value')
        },
        pos: {
          x: e.target.getAttribute('cx'),
          y: e.target.getAttribute('cy'),
        }
      }
    });
  }

  hideToolTip (e) {
    this.setState({
      tooltip: {
        display: {
          display: false,
          data: {
            key: '',
            value: ''
          }
        }
      }
    });
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

    const line = d3.line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.amount);
      })
      .curve(d3.curveCardinal);
    const yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10)
      .tickSize(-w);
    const xAxis = d3.axisBottom()
      .scale(x)
      .tickValues(this.props.data.map(function(d, i) {
        return d.date;
      }));

    return (
      <div>
        <svg width={styles.width} height={styles.height}>
          <g transform={transform}>
            <path className="line" d={line(this.props.data)} strokeLinecap="round" />
            <Markers 
              data={this.props.data} 
              x={x} 
              y={y}
              showToolTip={this.showToolTip}
              hideToolTip={this.hideToolTip}
            />
            <ToolTip tooltip={this.state.tooltip} />
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
          </g>
        </svg>
      </div>
    );
  }
}

export default TransactionsGraph;