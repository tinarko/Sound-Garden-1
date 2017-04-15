require('es6-promise').polyfill();
require('isomorphic-fetch');

export const deleteCashbackCategory = (catid) => {
  return {
    type: 'DELETE_CASHBACK_CATEGORY',
    catid: catid
  };
};

export const deleteCasbhackCategoryError = () => {
  return {
    type: 'DELETE_CASHBACK_CATEGORY_ERROR'
  };
};

export const deleteCashbackCategoryKickoff = (catid) => {
  return (dispatch) => {
    var url = '/creditcards/deletecashbackcategory/' + catid;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    })
    .then(response => {
      dispatch(deleteCashbackCategory(catid));
    })
    .catch((err) => {
      console.log('error in get', err);
      dispatch(deleteCasbhackCategoryError(err));
    });
  };
}