import LogementDao from "./Dao/LogementDao.js";
import FiltresLogment from "./model/FiltresLogement.js";
import Logement from "./model/Logement.js";
import VueAccueil from "./vue/VueAccueil.js";
import VueDetail from "./vue/VueDetail.js";
import VueFooter from "./vue/VueFooter.js";
import VueRecherche from "./vue/VueRecherche.js";
import VueReservation from "./vue/vueReservation.js";
import Reservation from "./model/Reservation.js";

export default class App {
  static page = document.getElementById("page");
  static footer = new VueFooter();
  /**
   * @param {Window} window
   */
  constructor(window) {
    this.window = window;

    this.vueAcceuil = new VueAccueil();
    this.vueRecherche = new VueRecherche();
    this.vueDetail = new VueDetail();
    this.vueReservation = new VueReservation();
    this.vueRecherche.initialiserActionFiltre((filtres) => this.actionFiltrerResultat(filtres));
    this.vueReservation.initialiserActionReservation((reservation) => this.actionReservation(reservation));
    this.longitude = null;
    this.latitude = null;
    this.initialiserNavigation(); //Doit retirer quand on passe au mobile

    /*document.addEventListener("deviceready", (e) => { //Doit reactiver avant de re importer dans android studio - faire cordova prepare avant de importer
      this.initialiserNavigation();
      this.initialiserSwipe();
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      });
    });*/
  }

  async initialiserNavigation() {
    /**@type Array<Logement> */
    this.logements = await LogementDao.ListerLogement(new FiltresLogment(), 10);
    this.window.addEventListener("hashchange", () => {
      this.naviger();
    });

    this.naviger();
  }

  naviger() {
    let hash = this.window.location.hash;

    if (!hash) {
      this.vueAcceuil.afficher(this.logements);
      console.log("test")
    } else if (hash.match(/^#recherche/)) {
      this.vueRecherche.afficher(this.logements, this.longitude, this.latitude);
    } else if ((navigation = hash.match(/^#logement\/([\d]+)/))) {
      let id = navigation[1];
      this.vueDetail.afficher(id);
    } else if ((navigation = hash.match(/^#reservation\/([\d]+)/))){
      let id = navigation[1];
      this.vueReservation.afficher(id);
    }
  }

  async actionFiltrerResultat(filtres) {
    var logementFiltrer = await LogementDao.ListerLogement(filtres, 0);
    if (logementFiltrer.length > 0) {
      var logementAcceuil = await LogementDao.ListerLogement(filtres, 10);
      this.logements = logementAcceuil;
    }
    this.vueRecherche.afficherNouveauResultat(logementFiltrer);
  }

  async actionReservation(reservation){
    var placerReservation = await LogementDao.ReserverLogement(reservation);
    this.logements = await LogementDao.ListerLogement(new FiltresLogment(), 10); //Actualise les logements apres la reservation
    window.location.href = "";
  }

  /*initialiserSwipe() {
    var region = ZingTouch.Region(App.page);
    region.bind(App.page, "swipe", function (event) {
      console.log(event.detail.data[0].currentDirection);
      if (90 <= event.detail.data[0].currentDirection && 270 >= event.detail.data[0].currentDirection) {
        document.location.href = "#recherche";
      } else {
        document.location.href = "#";
      }
    });
  }*/
}

new App(window);
console.log("success");