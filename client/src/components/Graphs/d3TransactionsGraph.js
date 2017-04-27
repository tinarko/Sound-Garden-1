import * as d3 from 'd3';

const d3TransactionsGraph = {};

d3TransactionsGraph.create = (el, originalData) => {
  const data = originalData.slice();
  const margin = {top: 20, right: 20, bottom: 30, left: 40};
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  const parseDate = d3.timeParse('%Y-%m-%d');
  data.forEach(function(d, i) {
    d.date = parseDate(d.date);
  });

  // const xValue = function(d) { return };
  // const xMap = function(d) { return xScale(xValue(d)); }
  const xScale = d3.scaleTime()
    .domain(d3.extend(data, function(d) {
      return d.date;
    }))
    .range([0, width]);
  const xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(10);

  const yValue = function(d) { return Math.abs(d.amount); };
  const yScale = d3.scaleLinear()
    .range([height, 0]);
  const yMap = function(d) { return yScale(yValue(d)); };
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)
    .tickSize(-width);

  const cValue = function(d) { return d.institution_name; };
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  
  console.log(data);
};

export default d3TransactionsGraph;