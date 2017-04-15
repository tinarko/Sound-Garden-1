import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeCashbackPercent } from '../actions/changecashbackpercent';
import { deleteCashbackCategoryKickoff } from '../actions/deletecashbackcategory';


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
    // var ccid = this.props.ccid;

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
            <button onClick={(e) => {
              this.props.deleteCashbackCategoryKickoff(ccindex, catindex, catid)
            } }>Delete</button>
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
  return {
    handleChange: (ccindex, catindex, percent, action, catid) => { 
      dispatch(changeCashbackPercent(ccindex, catindex, percent, action, catid)); 
    },
    deleteCashbackCategoryKickoff: (ccindex, catindex, catid) => {
      dispatch(deleteCashbackCategoryKickoff(ccindex, catindex, catid));
    }
  };
};

// export default connect (mapStateToProps, mapDispatchToProps) (CashbackCategory);
export default connect (null, mapDispatchToProps) (CashbackCategory);

