import App from "../App.js";
import LogementDao from "../Dao/LogementDao.js";

export default class VueDetail {
  constructor() {
    this.vueTemplate = document.getElementById("template-detail");
  }

  /**
   * @param {number} id
   */
  async afficher(id) {
    /**@type HTMLElement */
    let logementAffiche = this.vueTemplate.content.cloneNode(true);
    let logement = await LogementDao.RecupererLogementParId(id);
    logementAffiche.querySelector("#nom-logement").textContent = logement.nom;
    logementAffiche.querySelector("#image-logement").src = logement.image;
    logementAffiche.querySelector("#prix").textContent = `${logement.prix}$ par nuit`;
    logementAffiche.querySelector("#description").textContent = logement.description;
    var test = document.getElementById("reservation");
    test.addEventListener("click" , (evenement)=> this.reserver(evenement));
    App.page.replaceChildren(logementAffiche);
    App.footer.colorerBouton();
  }

  reserver(evenement){
    evenement.stopPropagation();
    evenement.preventDefault();
    alert("Reservation");
  }
}
