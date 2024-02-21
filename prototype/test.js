export default class Map {
  constructor() {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = "pk.eyJ1IjoiYmVsbHVtNTkiLCJhIjoiY2xvbjM4dnNtMXIzdTJycW90ODM4dHF0eiJ9.2mOtON-YIDjza5m_r8_avQ";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}

new Map();
