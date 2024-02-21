class LogementDao {
  static async RecupererLogementParId(id) {
    let logement;
    let data = new FormData();
    data.append("id", id);
    await fetch("https://www.mobile.beldevca.xyz/Api/RecupereLogementParId.php", {
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

  static async ListerLogement(longitude, lattitude, distance, prixMin, prixMax) {
    /**@type Array<Logement> */
    let logements = [];
    let data = new FormData();
    data.append("longitude", longitude);
    data.append("lattitude", lattitude);
    data.append("distance", distance);
    data.append("prixMin", prixMin);
    data.append("prixMax", prixMax);
    await fetch("https://www.mobile.beldevca.xyz/Api/FiltrerListe.php", {
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
    return logements;
  }
}
