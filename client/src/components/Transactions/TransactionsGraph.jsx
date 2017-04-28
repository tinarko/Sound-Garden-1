import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { VictoryAxis, 
  VictoryChart, 
  VictoryScatter, 
  VictoryTheme,
  VictoryTooltip, 
  VictoryStack,
  VictoryLegend,
  VictoryContainer 
} from 'victory';

const TransactionsGraph = (props) => {
  const styles = {};
  const data = [];
  const legendData = [];
  props.data.forEach((value, index) => {
    if (index > 0) { 
      const prev = props.data[index - 1].institution_name; 
      if (value.institution_name === prev) {
        return data[data.length - 1].push(value);
      } else {
        legendData.push({name: value.institution_name});
        return data.push([value]);
      }
    }
    legendData.push({name: value.institution_name});
    return data.push([value]);
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
      <VictoryLegend
        data={legendData}
        orientation={'horizontal'}
        padding={20}
        y={-50}
      />
      <VictoryStack
        scale={{x: 'time', y: 'linear'}}
        labelComponent={<VictoryTooltip 
          renderInPortal={false}
        />}
      >
        {data.map((item) => {
          const scatterData = item.map((value, index) => {
            const label = `Transaction: ${value.name} \n Amount: $${Math.abs(value.amount)}`;
            return {
              date: new Date(value.date),
              amount: Math.abs(value.amount),
              label: label,
            };
          });
          return (
            <VictoryScatter
              data={scatterData}
              x='date'
              y='amount'
            />
          );
        })}
      </VictoryStack>
    </VictoryChart>
  </div>);
};

export default TransactionsGraph;
