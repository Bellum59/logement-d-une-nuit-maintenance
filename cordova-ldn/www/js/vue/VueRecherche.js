import App from "../App.js";
import Map from "../map.js";
import FiltresLogment from "../model/FiltresLogement.js";
import VueFooter from "./VueFooter.js";

export default class VueRecherche {
  constructor() {
    this.vueTemplate = document.getElementById("template-recherche");
    this.actionFiltre = null;
  }

  afficher(logements, longitudeMap, latitudeMap) {
    if (longitudeMap == null || latitudeMap == null) {
      longitudeMap = -71.254028;
      latitudeMap = 46.829853; // Centrage par defaut sur quebec city
    }
    App.page.replaceChildren(this.vueTemplate.content.cloneNode(true));
    App.footer.colorerBouton(VueFooter.BOUTON.RECHERCHE);
    document.getElementById("formRecherche").addEventListener("submit", (evenement) => this.enregistrer(evenement));
    var logementsMap = { type: "FeatureCollection", features: [] };
    for (var logement of logements) {
      var proprietes = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [logement.longitude, logement.lattitude],
        },
        properties: {
          nom: logement.nom,
          prix: logement.prix,
          city: logement.ville,
          image: logement.image,
          country: logement.pays,
          description: logement.description,
          postalCode: logement.zipcode,
          state: logement.province,
          id: logement.id,
        },
      };
      logementsMap.features.push(proprietes);
    }
    new Map(logementsMap, longitudeMap, latitudeMap);
  }

  initialiserActionFiltre(actionFiltre) {
    this.actionFiltre = actionFiltre;
  }

  enregistrer(evenement) {
    evenement.preventDefault();
    let position = document.getElementById("location").value;
    position = position.split(",");
    let longitude = position[0];
    let lattitude = position[1];
    if (!longitude || !lattitude) {
      alert("Veuillez choisir une localisation de reference");
    } else {
      var filtres = new FiltresLogment();
      filtres.longitude = longitude;
      filtres.latitude = lattitude;
      filtres.prixMax = document.getElementById("prixmax").value;
      filtres.prixMin = document.getElementById("prixmini").value;
      filtres.distance = document.getElementById("distance").value;
      this.actionFiltre(filtres);
    }
  }

  afficherNouveauResultat(logements, longitudeMap, latitudeMap) {
    if (logements.length <= 0) {
      console.log("succes");
      alert("Aucun resultat trouver");
      return;
    }
    if (longitudeMap == null || latitudeMap == null) {
      longitudeMap = -71.254028;
      latitudeMap = 46.829853; // Centrage par defaut sur quebec city
    }
    document.getElementById("recherche").innerHTML = "";
    document.getElementById("map").innerHTML = "";
    var logementsMap = { type: "FeatureCollection", features: [] };
    for (var logement of logements) {
      var proprietes = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [logement.longitude, logement.lattitude],
        },
        properties: {
          nom: logement.nom,
          prix: logement.prix,
          city: logement.ville,
          image: logement.image,
          country: logement.pays,
          description: logement.description,
          postalCode: logement.zipcode,
          state: logement.province,
          id: logement.id,
        },
      };
      logementsMap.features.push(proprietes);
    }
    new Map(logementsMap, longitudeMap, latitudeMap);
  }
}
