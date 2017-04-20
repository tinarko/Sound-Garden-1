require('es6-promise').polyfill();
require('isomorphic-fetch');

export const deleteCashbackCategory = (ccindex, catindex) => {
  return {
    type: 'DELETE_CASHBACK_CATEGORY',
    ccindex: ccindex,
    catindex: catindex
  };
};

export const deleteCasbhackCategoryError = () => {
  return {
    type: 'DELETE_CASHBACK_CATEGORY_ERROR'
  };
};

export const deleteCashbackCategoryKickoff = (ccindex, catindex, catid) => {
  return (dispatch) => {
    var url = '/cashback/deletecashbackcategory/' + catid;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    })
    .then(response => {
      dispatch(deleteCashbackCategory(ccindex, catindex));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(deleteCasbhackCategoryError(err));
    });
  };
}