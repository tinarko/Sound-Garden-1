import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeCashbackPercent } from '../actions/cashbackpercent';

class CashbackCategory extends React.Component {
  constructor (props) {
    super(props);
  }

  // componentWillMount() {
  // }

  render () {
    var catid = this.props.category.catid;
    var percent = this.props.category.percent;
    var catname = this.props.category.name;
    return (
      <div>
        <p>{catname}: {percent} % 
          <button onClick={this.props.handleChange(catid, percent, 'decrement')}>-</button>
          <button onClick={this.props.handleChange(catid, percent, 'increment')}>+</button>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // cashbackpercent: state.cashbackpercent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (catid, percent, action) => { dispatch(changeCashbackPercent(catid, percent, action)); },
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CashbackCategory);

