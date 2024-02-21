export default class Logement {
  /**@type string */
  nom;
  /**@type string */
  description;
  /**@type string */
  image;
  /**@type string */
  ville;
  /**@type string */
  province;
  /**@type string */
  codePostal;
  /**@type string */
  pays;
  /**@type float */
  lattitude;
  /**@type float */
  longitude;
  /**@type float */
  prix;
  /**@type int */
  id;
  /**
   *
   * @param {string} nom
   * @param {string} description
   * @param {string} image
   * @param {string} ville
   * @param {string} province
   * @param {string} codePostal
   * @param {string} pays
   * @param {float} lattitude
   * @param {float} longitude
   * @param {float} prix
   * @param {int} id
   */
  constructor(nom, description, image, ville, province, codePostal, pays, lattitude, longitude, prix, id) {
    this.nom = nom;
    this.description = description;
    this.image = image;
    this.ville = ville;
    this.province = province;
    this.codePostal = codePostal;
    this.pays = pays;
    this.lattitude = lattitude;
    this.longitude = longitude;
    this.prix = prix;
    this.id = id;
  }
}
