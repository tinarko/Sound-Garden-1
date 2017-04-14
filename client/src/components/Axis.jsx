import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.renderAxis = this.renderAxis.bind(this);
  }
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }
  renderAxis() {
    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.axis);
  }
  render() {
    const translate = `translate(0, ${this.props.h})`;
    return (
      <g className="axis" transform={this.props.axisType === 'x' ? translate : ''}/>
    );
  }
}

export default Axis;