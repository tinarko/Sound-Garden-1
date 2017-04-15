import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeCashbackPercent } from '../actions/changecashbackpercent';


class CashbackCategory extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
  }

  render () {
    var ccindex = this.props.ccindex;
    var catindex = this.props.catindex;
    var percent = this.props.category.percent;
    var catname = this.props.category.name;
    var catid = this.props.catid;

    return (
      <li>
        <div>
          <p>{catname}: {percent} % 
            <button onClick={ (e) => {
              this.props.handleChange(ccindex, catindex, percent, 'decrement', catid)
            } } > - </button>
            <button onClick={ (e) => {
              this.props.handleChange(ccindex, catindex, percent, 'increment', catid)
            } } > + </button>
          </p>
        </div>
      </li>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     // cashbackpercent: state.cashbackpercent,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  console.log('category');
  return {
    handleChange: (ccindex, catindex, percent, action, catid) => { dispatch(changeCashbackPercent(ccindex, catindex, percent, action, catid)); },
  };
};

// export default connect (mapStateToProps, mapDispatchToProps) (CashbackCategory);
export default connect (null, mapDispatchToProps) (CashbackCategory);

