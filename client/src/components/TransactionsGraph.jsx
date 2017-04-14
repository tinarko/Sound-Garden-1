import React from 'react';
import * as d3 from 'd3';
import Markers from './Markers.jsx';
import Axis from './Axis.jsx';

class TransactionsGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data=[
        {day:'02-11-2016',count:180},
        {day:'02-12-2016',count:250},
        {day:'02-13-2016',count:150},
        {day:'02-14-2016',count:496},
        {day:'02-15-2016',count:140},
        {day:'02-16-2016',count:380},
        {day:'02-17-2016',count:100},
        {day:'02-18-2016',count:150}
    ];
    // styles generally from props
    const styles = {
      width: 800,
      height: 300,
    };
    const margin = {top: 5, right: 50, bottom: 20, left: 50};
    const w = styles.width - (margin.left + margin.right);
    const h = styles.height - (margin.top + margin.bottom);
    const transform = `translate(${margin.left}, ${margin.top})`;

    const parseDate = d3.timeParse('%m-%d-%Y');
    data.forEach(function(d) {
      d.date = parseDate(d.day);
    });

    // x and y are scales for the data (line)
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) {
        return d.date;
      }))
      .range([0, w]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        return d.count + 100;
      })])
      .range([h, 0]);

    const line = d3.line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.count);
      })
      .curve(d3.curveCardinal);
    const yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10)
      .tickSize(-w);
    const xAxis = d3.axisBottom()
      .scale(x)
      .tickValues(data.map(function(d, i) {
        return d.date;
      }));

    return (
      <div>
        <svg width={styles.width} height={styles.height}>
          <g transform={transform}>
            <path className="line" d={line(data)} strokeLinecap="round" />
            <Markers data={data} x={x} y={y}/>
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
          </g>
        </svg>
      </div>
    );
  }
}

export default TransactionsGraph;