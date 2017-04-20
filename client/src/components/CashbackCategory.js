import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeCashbackPercent } from '../actions/changecashbackpercent';
import { deleteCashbackCategoryKickoff } from '../actions/deletecashbackcategory';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';


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
          <p>• {catname}: 
            <IconButton onClick={ (e) => {
              this.props.handleChange(ccindex, catindex, percent, 'decrement', catid)
              } } > 
              <ContentRemoveCircleOutline/>
            </IconButton>
            {percent} % 
            <IconButton onClick={ (e) => {
              this.props.handleChange(ccindex, catindex, percent, 'increment', catid)
              } } > 
              <ContentAddCircleOutline/>
            </IconButton>
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

/*
 <RaisedButton label="-"  onClick={ (e) => {
              this.props.handleChange(ccindex, catindex, percent, 'decrement', catid)
            } }/>

            <RaisedButton label="+"  onClick={ (e) => {
              this.props.handleChange(ccindex, catindex, percent, 'increment', catid)
            } }/>

            <RaisedButton label="Delete"  onClick={(e) => {
              this.props.deleteCashbackCategoryKickoff(ccindex, catindex, catid)
            } }/>

*/
