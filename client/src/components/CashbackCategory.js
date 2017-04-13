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
    var ccid = this.props.cc;
    return (
      <div>
        <p>{catname}: {percent} % 
          <button onClick={(e) => {this.props.handleChange(catid, percent, 'decrement', ccid)}}>-</button>
          <button onClick={(e) => {this.props.handleChange(catid, percent, 'increment', ccid)}}>+</button>
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
    handleChange: (catid, percent, action, ccid) => { dispatch(changeCashbackPercent(catid, percent, action, ccid)); },
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CashbackCategory);

