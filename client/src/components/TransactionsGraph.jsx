import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { VictoryAxis, 
  VictoryChart, 
  VictoryScatter, 
  VictoryTheme,
  VictoryTooltip } from 'victory';

const TransactionsGraph = (props) => {
  const styles = {};
  const data = props.data.map((value, index) => {

    const label = `Transaction: ${value.name} \n Amount: $${Math.abs(value.amount)}`;
    return {
      date: new Date(value.date),
      amount: Math.abs(value.amount),
      label: label,
    };
  });
  return (<div className="transactions-chart">
    <VictoryChart
      domainPadding={50}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        gridComponent={<div/>}
        scale={'time'}
        standalone={false}
      />
      <VictoryAxis
        dependentAxis
        tickFormat = {(x) => (`$${x}`)}
      /> 
      <VictoryScatter
        labelComponent={<VictoryTooltip 
          renderInPortal={false}
        />}
        data={data}
        scale={{x: 'time', y: 'linear'}}
        x='date'
        y='amount'
      />
    </VictoryChart>
  </div>);
};

export default TransactionsGraph;
