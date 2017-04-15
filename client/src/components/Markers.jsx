import React from 'react';
import * as d3 from 'd3';

// import data, & y
const Markers = (props) => {
  // const data = this.props.data.splice(1); can remove last and data.pop() for formatting
  const data = props.data.splice(1);
  data.pop();
  return (
    <g>
      {data.map(function(d, i) {
        return (<circle className="graph-circles" 
          r="5" 
          cx={props.x(d.date)} 
          cy={props.y(d.amount)} 
          fill="blue"
          stroke="#3f4186"
          strokeWidth="3px"
          key={i}
          onMouseOver={props.showToolTip}
          onMouseOut={props.hideToolTip}
        />);
      })}
    </g>
  );
};

export default Markers;
