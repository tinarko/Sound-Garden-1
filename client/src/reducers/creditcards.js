const initialState = {
  cc: [],
  fetchingCreditcards: false,
  cashbacksetup: false,
};

const creditcards = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCHING_CREDITCARDS':
      return {
        ...state,
        fetchingCreditcards: true
      };
      break;
    case 'RECEIVED_CREDITCARDS':
      var checkCC = action.cc;
      var resultsCC = state.cc;

      var same = false;
      for (var j = 0; j < checkCC.length; j++) {
        for (var i = 0; i < resultsCC.length; i++) {
          if (resultsCC[i].ccid  === checkCC[j].ccid) {
            same = true;
          }
        }
        if (!same) {
          resultsCC.push(checkCC[j]);
        }
        same = false;
      } 
      return {
        ...state,
        cc: resultsCC
      };
      break;
    case 'FETCH_CREDITCARDS_ERROR':
      return {
        ...state,
        error: action.error
      };
      break;
    case 'GET_CREDITCARDS_ERROR':
      return {
        ...state,
        error: action.error
      };
      break;
    case 'TOGGLE_CASHBACK_SETUP':
      return {
        ...state,
        cashbacksetup: !state.cashbacksetup
      };
      break;
    case 'INCREMENT_CASHBACK_PERCENT':
      var ccindex = action.ccindex;
      var catindex = action.catindex;
      var newCat = Object.assign({}, state.cc[ccindex].categories[catindex]);
      newCat.percent+=0.5;

      var allTheCCs = state.cc.map((cc, ccIndex)=>{
        if (ccIndex === ccindex) {
          return { 
            ccid: state.cc[ccIndex].ccid, 
            ccname: state.cc[ccIndex].ccname,
            categories: state.cc[ccIndex].categories.map((cat, catIndex) => {
              if (catIndex === catindex) {
                return newCat;
              } else {
                return cat;
              }
            })
          };
        } else {
          return cc;
        }
      });

      return {
        ...state,
        cc: allTheCCs
      };
      break;
    case 'DECREMENT_CASHBACK_PERCENT':
      var ccindex = action.ccindex;
      var catindex = action.catindex;
      var newCat = Object.assign({}, state.cc[ccindex].categories[catindex]);
      newCat.percent-=0.5;

      var allTheCCs = state.cc.map((cc, ccIndex)=>{
        if (ccIndex === ccindex) {
          return { 
            ccid: state.cc[ccIndex].ccid, 
            ccname: state.cc[ccIndex].ccname,
            categories: state.cc[ccIndex].categories.map((cat, catIndex) => {
              if (catIndex === catindex) {
                return newCat;
              } else {
                return cat;
              }
            })
          };
        } else {
          return cc;
        }
      });

      return {
        ...state,
        cc: allTheCCs
      };
      break;
    case 'CHANGE_CASHBACK_PERCENT_ERROR':
      return {
        ...state,
        error: action.error
      }
      break;
    case 'CREATE_CASHBACK_CATEGORY':
      var catid = action.catid;
      var ccindex = action.ccindex;
      var name = action.name;
      var percent = action.percent;

      var newCC = JSON.parse(JSON.stringify(state.cc));

      newCC[ccindex].categories.push({
        catid: catid, 
        name: name,
        percent: percent
      });

      return {
        ...state,
        cc: newCC
      };
      break;
    case 'GET_CASHBACK_CATEGORY': 
      var categories = action.cbcategories;
      var ccid = action.ccid;

      // put fetched categories in correct credit card's categories without changing initial state
      var newCC = JSON.parse(JSON.stringify(state.cc));

      for (var i = 0; i < newCC.length; i++) {
        if (newCC[i].ccid === ccid) {
          newCC[i].categories = categories;
          break;
        }
      }
      
      return {
        ...state,
        cc: newCC
      };
      break;
    case 'EDIT_CATEGORY_NAME':
      var catname = action.catname;
      return {
        ...state,
        catname: catname
      };
      break;
    case 'EDIT_CASHBACK_PERCENT':
      var percent = action.percent;
      return {
        ...state,
        percent: percent
      };
      break;
    case 'DELETE_CASHBACK_CATEGORY':
      var ccindex = action.ccindex;
      var catindex = action.catindex;

      var newCC = JSON.parse(JSON.stringify(state.cc));

      newCC[ccindex].categories.splice(catindex, 1);

      return {
        ...state,
        cc: newCC
      }
      break;
    default:
      return state;
    }
};

export default creditcards;
