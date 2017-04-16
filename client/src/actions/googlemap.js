export const getLocation = () => {
  // post request to google geolocate api
  //  AIzaSyDmTpCBlT0ib4dNTKVRpww0xE2fvL5zHuw (geolocate/maps --> visualization)
  //  AIzaSyCNxqMIVkgQDmSiOKHNq_OhdX84T-9qRS0 (places) api key
  fetch('/google/geolocate', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => {
      response.json()
      .then((data) => {
        console.log('data here from geolocate', data);
        // fetch('/google/places', {
        //   method: 'POST',
        //   credentials: 'same-origin',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: {
        //     location: response,
        //   }
        // });
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((error) => {
      // TODO: error handle
      console.log(error);
    });
}