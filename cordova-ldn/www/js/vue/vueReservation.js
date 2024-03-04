import App from "../App.js";
import LogementDao from "../Dao/LogementDao.js";

export default class VueReservation {
  constructor() {
    this.vueTemplate = document.getElementById("template-reservation-logement");
    this.logement = null;
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
  }
}
