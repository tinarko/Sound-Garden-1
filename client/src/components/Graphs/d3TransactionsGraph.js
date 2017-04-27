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
    .domain(d3.extent(data, function(d) {
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

  let svg = d3.select('d3TransactionsGraph').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
  let tooltip = d3.select('d3TransactionsGraph').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);
  
  yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
    .append('text')
      .attr('class', 'label')
      .attr('x', width)
      .attr('y', -6);
      // .style('text-anchor', 'end')
      // .text('$');

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('$');

  svg.selectAll('.dot')
      .data(data)
    .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 3.5)
      .attr('cx', xMap)
      .attr('cy', yMap)
      .style('fill', function(d) { return color(cValue(d)); })
      .on('mouseover', function(d) {
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);
        tooltip.html(d[''])
      })
  
  console.log(data);
};

export default d3TransactionsGraph;