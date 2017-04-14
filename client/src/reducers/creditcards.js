const initialState = {
  cc: [],
  fetchingCreditcards: false,
  cashbacksetup: false
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
      var ccid = action.ccid;
      var catid = action.catid;
      var cc = state.cc.slice();
      console.log('state.cc', state.cc);
      for (var i = 0; i < cc.length; i++) {
        if (cc[i].ccid === ccid) {
          for (var j = 0; j < cc[i].categories.length; j++) {
            if (cc[i].categories[j].catid === catid) {
              cc[i].categories[j].percent += 0.5;
              break;
            }
          }
        }
        break;
      }
      console.log('cc is now', cc);
      return {
        ...state,
        cc: cc
      };
      break;
    case 'DECREMENT_CASHBACK_PERCENT':
      var ccid = action.ccid;
      var catid = action.catid;
      var cc = state.cc.slice();
      for (var i = 0; i < cc.length; i++) {
        if (cc[i].ccid === ccid) {
          for (var j = 0; j < cc[i].categories.length; j++) {
            if (cc[i].categories[j].catid === catid) {
              cc[i].categories[j].percent -= 0.5;
              break;
            }
          }
        }
        break;
      }
      console.log('cc is now', cc);
      return {
        ...state,
        cc: cc
      };
      break;
    case 'CHANGE_CASHBACK_PERCENT_ERROR':
      return {
        ...state,
        error: action.error
      }

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
      }
      break;
    default:
      return state;
    }
};

export default creditcards;
