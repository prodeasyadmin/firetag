
// const {Client} = require("@googlemaps/google-maps-services-js");
// const axios = require('axios');

let map, infoWindow;




  // searchbox
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 20,
    mapTypeId: "satellite",
  });
  // Create the search box and link it to the UI element.
  
  

  
  var x=document.getElementById("demo");
  function getLocation()
   {
  if (navigator.geolocation)
  {
  navigator.geolocation.getCurrentPosition(        
    (position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    let resp = axios.post('/addname', pos, () => {
      console.log('resp',2,  resp);

    });
    console.log('resp', resp);
    map.setCenter(pos);
    new google.maps.Marker({
      position: pos,
      map,
      title: "Current Location",
    });
  },
  () => {
    handleLocationError(true, infoWindow, map.getCenter());
  }
  );
  }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }
  getLocation()
  
  
  
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  // map.addListener("bounds_changed", () => {
  //   searchBox.setBounds(map.getBounds());
  // });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

// let resp = axios.post('/addname', pos).then(() => {
//   console.log('resp',2,  resp);

// });
// console.log('resp', resp);
