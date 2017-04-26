import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeCashbackPercent } from '../actions/changecashbackpercent.js';
import { deleteCashbackCategoryKickoff } from '../actions/deletecashbackcategory.js';
import { getCashbackCategoriesKickoff } from '../actions/createcashbackcategory.js';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';

class CashbackCategory extends React.Component {
  constructor (props) {
    super(props);
  }

  // componentDidMount() {
  // }

  render () {
    var ccid = this.props.ccid;
    var category = this.props.category;
    var catid = category.catid;
    var percent = category.percent;
    var catindex = this.props.catindex;
    var ccindex = this.props.ccindex;

    return (
      <li>
        <p> • {category.name} : 
          <IconButton 
            onClick={ (e) => {
            this.props.handleChange(ccindex, catindex, percent, 'decrement', catid)
            } } > 
            <ContentRemoveCircleOutline/> 
          </IconButton>
          {category.percent} %
          <IconButton 
            onClick={ (e) => {
            this.props.handleChange(ccindex, catindex, percent, 'increment', catid)
            } } > 
            <ContentAddCircleOutline/> 
          </IconButton>

          <button onClick={(e) => {
            this.props.deleteCashbackCategoryKickoff(ccindex, catindex, catid)
          } }>Delete</button>
        </p>
      </li> 
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     creditcards: state.creditcards.cc
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (ccindex, catindex, percent, action, catid) => { 
      dispatch(changeCashbackPercent(ccindex, catindex, percent, action, catid)); 
    },
    deleteCashbackCategoryKickoff: (ccindex, catindex, catid) => {
      dispatch(deleteCashbackCategoryKickoff(ccindex, catindex, catid));
    },
  }
}

export default connect (null, mapDispatchToProps) (CashbackCategory);



