import App from "../App.js";
import LogementDao from "../Dao/LogementDao.js";
import Reservation from "../model/Reservation.js";

export default class VueReservation {
  constructor() {
    this.vueTemplate = document.getElementById("template-reservation-logement");
    this.logement = null;
    this.actionReservation = null;
  }

  /**
   * @param {number} id
   */
  async afficher(id) {
    /**@type HTMLElement */
    let logementReservation = this.vueTemplate.content.cloneNode(true);
    this.logement = await LogementDao.RecupererLogementParId(id);
    logementReservation.querySelector("#nom-logement").textContent = this.logement.nom;
    logementReservation.querySelector("#prix-logement").textContent = this.logement.prix+ "$";
    App.page.replaceChildren(logementReservation);
    App.footer.colorerBouton();
    document.getElementById("formReservation").addEventListener("submit", (evenement) => this.enregistrer(evenement));
  }

  initialiserActionReservation(actionReservation){
    this.actionReservation = actionReservation;
  }

  enregistrer(evenement){
    evenement.preventDefault();
    var dateDebutNonFormatter = document.getElementById("date-debut").value;
    var heureDebut = document.getElementById("heure-debut").value;
    var dateFinNonFormatter = document.getElementById("date-fin").value;
    var heureFin = document.getElementById("heure-fin").value;
    var dateDebut = dateDebutNonFormatter + " " + heureDebut;
    var dateFin = dateFinNonFormatter + " " + heureFin;
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var email = document.getElementById("email").value;
    var reservation = new Reservation();
    reservation.nomReservation = nom;
    reservation.prenomReservation = prenom;
    reservation.idLogement = this.logement.id;
    reservation.emailReservation = email;
    reservation.dateDebut = dateDebut;
    reservation.dateFin = dateFin;
    this.actionReservation(reservation);
  }
}
