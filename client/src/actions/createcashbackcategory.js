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

export const createCashbackCategory = (ccid, name, percent, catid) => {
  return {
    type: 'CREATE_CASHBACK_CATEGORY',
    ccid: ccid, 
    name: name,
    percent: percent,
    catid: catid
  };
};

export const createCashbackCategoryKickoff = (ccid, name, percent) => {
  return (dispatch) => {
    fetch('/creditcards/createcashbackcategory', {
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
      dispatch(createCashbackCategory(ccid, name, percent, catid));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(createCashbackCategoryError(err));
    });
  };
};
