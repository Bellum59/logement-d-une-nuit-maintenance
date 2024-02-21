import App from "../App.js";
import Logement from "../model/Logement.js";
import VueFooter from "./VueFooter.js";

export default class VueAccueil {
  constructor() {
    this.vueTemplate = document.getElementById("template-accueil");
    this.logementTemplate = document.getElementById("template-appercu-logement");
  }

  /**
   * @param {Array<Logement>} logements
   */
  afficher(logements) {
    App.page.replaceChildren(this.vueTemplate.content.cloneNode(true));
    App.footer.colorerBouton(VueFooter.BOUTON.ACCUEIL);
    logements.forEach((logement) => {
      /**@type HTMLElement */
      let logementAffiche = this.logementTemplate.content.cloneNode(true);
      logementAffiche.querySelector(".appercu-logement").href += logement.id;
      logementAffiche.querySelector(".accueilimg").src = logement.image;
      logementAffiche.querySelector(".nom").textContent = logement.nom;
      logementAffiche.querySelector(".adresse").textContent = logement.ville;
      logementAffiche.querySelector(".prix").textContent = `${logement.prix}$ par nuit`;
      document.getElementById("accueil").appendChild(logementAffiche);
    });
  }
}
