export default class VueFooter {
  constructor() {
    this.boutonsFooter = document.querySelectorAll(".bouton-footer");
  }
  static BOUTON = {
    ACCUEIL: document.getElementById("footer-bouton-accueil"),
    RECHERCHE: document.getElementById("footer-bouton-recherche"),
  };

  /**
   * @param {HTMLElement} bouton
   */
  colorerBouton(bouton = null) {
    this.boutonsFooter.forEach((boutonFooter) => {
      boutonFooter.classList.remove("actif");
    });
    if (bouton) bouton.classList.add("actif");
  }
}
