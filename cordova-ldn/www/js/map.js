export default class Map {
  constructor(logement,longitudeMap,lattitudeMap) {
    mapboxgl.accessToken = "pk.eyJ1IjoiYmVsbHVtNTkiLCJhIjoiY2xvbjM4dnNtMXIzdTJycW90ODM4dHF0eiJ9.2mOtON-YIDjza5m_r8_avQ";
    

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitudeMap, lattitudeMap],
      zoom: 9,
      scrollZoom: true,
    });


    //REmplacer id par id bdd
    /*logement.features.forEach(function (logement, i) {
      logement.properties.id = i;
    });*/

    map.on("load", () => {
      /* Add the data to your map as a layer */
      map.addSource("places", {
        type: "geojson",
        data: logement,
      });
      addMarkers();
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: true, // Use the geocoder's default marker style
      });
      document.getElementById("recherche").appendChild(geocoder.onAdd(map));
      geocoder.on("result", (event) => {
        const searchResult = event.result.geometry;
        var position = [searchResult.coordinates[0],searchResult.coordinates[1]];
        document.getElementById("location").value = position;
      });
    });

    var geolocate = new mapboxgl.GeolocateControl();

    map.addControl(geolocate);

    geolocate.on('geolocate', function(e) {
          var lon = e.coords.longitude;
          var lat = e.coords.latitude
          var position = [lon, lat];
          document.getElementById("location").value = position;
    });

    function addMarkers() {
      /* For each feature in the GeoJSON object above: */
      for (const marker of logement.features) {
        /* Create a div element for the marker. */
        const el = document.createElement("div");
        /* Assign a unique `id` to the marker. */
        el.id = `marker-${marker.properties.id}`;
        /* Assign the `marker` class to each marker for styling. */
        el.className = "marker";

        /**
         * Create a marker using the div element
         * defined above and add it to the map.
         **/
        new mapboxgl.Marker(el, { offset: [0, -23] }).setLngLat(marker.geometry.coordinates).addTo(map);

        el.addEventListener("click", (e) => {
          /* Fly to the point */
          flyToStore(marker);
          /* Close all other popups and display popup for clicked store */
          createPopUp(marker);
          /* Highlight listing in sidebar */
          const activeItem = document.getElementsByClassName("active");
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove("active");
          }
        });
      }
    }

    map.on("click", (event) => {
      /* Determine if a feature in the "locations" layer exists at that point. */
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["locations"],
      });

      /* If it does not exist, return */
      if (!features.length) return;

      const clickedPoint = features[0];

      /* Fly to the point */
      flyToStore(clickedPoint);

      /* Close all other popups and display popup for clicked store */
      createPopUp(clickedPoint);
    });

    map.addControl(new mapboxgl.NavigationControl());

    function flyToStore(currentFeature) {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15,
      });
    }

    function createPopUp(currentFeature) {
      const popUps = document.getElementsByClassName("mapboxgl-popup");
      /** Check if there is already a popup on the map and if so, remove it */
      if (popUps[0]) popUps[0].remove();

      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<h3>${currentFeature.properties.nom}</h3><img src=${currentFeature.properties.image} class='imgproduit'><h4>Prix :${currentFeature.properties.prix}</h4><a href='#logement/${currentFeature.properties.id}' class='lienLogement'> Voir details </a>`)
        .addTo(map);
    }
  }
}
