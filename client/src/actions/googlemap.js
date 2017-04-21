export const getLocation = () => {
  return (dispatch) => {
    // obtain geolocation
    fetch('/google/geolocate', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        response.json()
        .then((geolocation) => {
          // obtain nearby stores
          fetch('/google/places', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              location: geolocation,
            })
          })
            .then((response) => {
              response.json()
              .then((placesData) => {
                dispatch(
                  {
                    type: 'FETCHED_GOOGLE_DATA', 
                    payload: 
                    {
                      geolocation: geolocation.location,
                      places: placesData.results
                    }
                  }
                );
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((error) => {
        // TODO: error handle
        console.log(error);
      });
  };
};