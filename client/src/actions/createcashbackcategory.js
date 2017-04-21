require('es6-promise').polyfill();
require('isomorphic-fetch');

export const createCashbackCategoryError = () => {
  return {
    type: 'CREATE_CASHBACK_CATEGORY_ERROR'
  };
};

export const handleCategoryChange = (catname) => {
  return {
    type: 'EDIT_CATEGORY_NAME',
    catname: catname
  };
};

export const handlePercentChange = (percent) => {
  return {
    type: 'EDIT_CASHBACK_PERCENT',
    percent: percent
  };
};

export const createCashbackCategory = (ccindex, name, percent, catid) => {
  return {
    type: 'CREATE_CASHBACK_CATEGORY',
    ccindex: ccindex, 
    name: name,
    percent: percent,
    catid: catid
  };
};

export const createCashbackCategoryKickoff = (ccindex, ccid, name, percent) => {
  return (dispatch) => {
    fetch('/cashback/createcashbackcategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        ccid: ccid, 
        name: name, 
        percent: percent
      })
    })
    .then(response => {
      return response.json();
    })
    .then((catid) => {
      dispatch(createCashbackCategory(ccindex, name, percent, catid));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(createCashbackCategoryError(err));
    });
  };
};

export const getCashbackCategoriesKickoff = (ccid) => {
  var url = '/cashback/getcashbackcategories/' + ccid;
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    })
    .then(response => {
      return response.json();
    })
    .then((json) => {
      dispatch(getCashbackCategory(ccid, json));
    })
    .catch((err) => {
      dispatch(getCashbackCategoryError(err));
    });
  };
};

export const getCashbackCategory = (ccid, cbcategories) => {
  return {
    type: 'GET_CASHBACK_CATEGORY',
    cbcategories: cbcategories,
    ccid: ccid
  };
};

export const getCashbackCategoryError = (error) => {
  return {
    type: 'GET_CASHBACK_CATEGORY_ERROR',
    error: error
  };
};



