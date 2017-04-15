const initialState = {
  cc: [],
  fetchingCreditcards: false,
  cashbacksetup: false,
  catname: '',
  percent: 0
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
      return {
        ...state,
        cc: action.cc
      };
      break;
    case 'FETCH_CREDITCARDS_ERROR':
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
      var ccid = action.ccid;
      var name = action.name;
      var percent = action.percent;

      var cc = state.cc.slice();
      for (var i = 0; i < cc.length; i++) {
        if (cc[i].ccid === ccid) {
          cc[i].categories.push({
            name: name,
            percent: percent,
            catid: catid
          });
        }
        break;
      }
      console.log('updated cc', cc);
      return {
        ...state,
        cc: cc
      };
      break;
    case 'EDIT_CATEGORY_NAME':
      console.log('HI!');
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
    default:
      return state;
    }
};

export default creditcards;
