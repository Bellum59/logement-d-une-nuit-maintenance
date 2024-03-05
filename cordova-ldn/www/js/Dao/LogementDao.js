import FiltresLogment from "../model/FiltresLogement.js";
import Logement from "../model/Logement.js";

export default class LogementDao {
  static async RecupererLogementParId(id) {
    let logement;
    let data = new FormData();
    data.append("id", id);
    await fetch("https://mobile.devbel.xyz/Api/RecupereLogementParId.php", {
      method: "POST",
      body: data,
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        logement = new Logement(
          data.nom,
          data.description,
          data.image,
          data.ville,
          data.province,
          data.codePostal,
          data.pays,
          data.lattitude,
          data.longitude,
          data.prix,
          data.id
        );
      });
    return logement;
  }

  /**
   *
   * @param {FiltresLogment} filtresLogment
   * @param {number} [limite=0]
   * @returns
   */
  static async ListerLogement(filtresLogment, limite = 0) {
    console.log("lister Logement : " + limite);
    /**@type Array<Logement> */
    let logements = [];
    let data = new FormData();
    if (filtresLogment.longitude) data.append("longitude", filtresLogment.longitude);
    if (filtresLogment.latitude) data.append("latitude", filtresLogment.latitude);
    if (filtresLogment.distance) data.append("distance", filtresLogment.distance);
    if (filtresLogment.prixMin) data.append("prixMin", filtresLogment.prixMin);
    if (filtresLogment.prixMax) data.append("prixMax", filtresLogment.prixMax);
    data.append("limite", limite);
    await fetch("https:/mobile.devbel.xyz/Api/FiltrerListe.php", {
      method: "POST",
      body: data,
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        data.forEach((logement) => {
          logements.push(
            new Logement(
              logement.nom,
              logement.description,
              logement.image,
              logement.ville,
              logement.province,
              logement.codePostal,
              logement.pays,
              logement.lattitude,
              logement.longitude,
              logement.prix,
              logement.id
            )
          );
        });
      });
    console.log(logements);
    return logements;
  }

  static async ReserverLogement(reservation){;
    let data = new FormData();
    data.append("idLogement", reservation.idLogement);
    data.append("dateDebutReservation", reservation.dateDebut);
    data.append("dateFinReservation", reservation.dateFin);
    data.append("nomReservation", reservation.nomReservation);
    data.append("prenomReservation", reservation.prenomReservation);
    data.append("emailReservation", reservation.emailReservation);
    await fetch("https://mobile.devbel.xyz/Api/AjouterReservation.php", {
      method: "POST",
      body: data,
    })
    .then((reponse) => reponse.json())
      .then((data) => {
        return;
      });
  }
}
