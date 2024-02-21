# Exemple de mise a jour avec l'ajout d'un champ

## Sql :

1- Se connecter a phpMyadmin et a la base "logementNuit";

2-  Sur la table logement, executer le code suivant dans la partie SQL de la page
```sql
  ALTER TABLE `logement` ADD COLUMN `disponible` BOOLEAN DEFAULT 1
```
Permet d'ajouter le champs avec une valeur de true par defaut pour toutes les entrees.
Juste pour etre sur que aucune valeur n'est rester NULL on peut executer la requete suivante :

```sql
  UPDATE `logement` SET `disponible`= 1 WHERE `disponible` IS NULL
```

3 - Ajout d'une nouvelle entree dans la base de donnees :

```sql
INSERT INTO logement (nom,description,image,ville,province,codePostal,pays,lattitude,longitude,prix) VALUES (:nom,:description,:image,:ville,:province,:codePostal,:pays,:lattitude,:longitude,:prix)
```
Il faut remplacer les champs apres Value pars les valeur desirees

## Coter serveur :

1- Ce rendre dans le repertoire Mobile du serveur distant
```
 cd /var/www/projetMobile
```
2- Dans modele/LogementPhp rajouter le champs disponible dans l'objet logement, dans le constructeur et dans les filtres :

```php
<?php

class Logement
{
    public ?int $id;
    public ?string $nom;
    public ?string $description;
    public ?string $image;
    public ?string $ville;
    public ?string $province;
    public ?string $codePostal;
    public ?string $pays;
    public ?float $lattitude;
    public ?float $longitude;
    public ?float $prix;
    public ?boolean $disponible; //Ligne ajouter

    private static array $filter = [
        "id" => FILTER_SANITIZE_NUMBER_INT,
        "nom" => FILTER_SANITIZE_SPECIAL_CHARS,
        "description" => FILTER_SANITIZE_SPECIAL_CHARS,
        "image" => FILTER_SANITIZE_SPECIAL_CHARS,
        "ville" => FILTER_SANITIZE_SPECIAL_CHARS,
        "province" => FILTER_SANITIZE_SPECIAL_CHARS,
        "codePostal" => FILTER_SANITIZE_SPECIAL_CHARS,
        "pays" => FILTER_SANITIZE_SPECIAL_CHARS,
        "lattitude" => FILTER_SANITIZE_NUMBER_FLOAT,
        "longitude" => FILTER_SANITIZE_NUMBER_FLOAT,
        "prix" => FILTER_SANITIZE_NUMBER_FLOAT,
        "disponible" => FILTER_VALIDATE_BOOLEAN //ligne ajouter
    ];

    public function __construct(array $array, bool $doitFiltrer = false)
    {
        if ($doitFiltrer) $array = filter_var_array($array, Logement::$filter); //L'array est automatiquement creer par le DAO, pas besoin d'y retoucher
        $this->id = $array["id"] ?? null;
        $this->nom = $array["nom"] ?? null;
        $this->description = $array["description"] ?? null;
        $this->image = $array["image"] ?? null;
        $this->ville = $array["ville"] ?? null;
        $this->province = $array["province"] ?? null;
        $this->codePostal = $array["codePostal"] ?? null;
        $this->pays = $array["pays"] ?? null;
        $this->lattitude = $array["lattitude"] ?? null;
        $this->longitude = $array["longitude"] ?? null;
        $this->prix = $array["prix"] ?? null;
        $this->disponible = $array["disponible"] ?? null; //Ligne ajouter
    }
}
```

3 - AJouter les fonctions dans le Dao qui permet de changer la valeur pour un bien dans le fichier Dao/LogementDao.php :

  Il faut necessairement ajouter une id en parametre d'entree pour ne pas mettres a jour tout les champs.
  Il faut ajouter 2 fonctions une pour ajouter le Logement en disponible et une pour mettre un logement en non disponible
  Exemple pour passer un element de disponible a non disponible :

  ```php
  /*
    Met la disponibiliter d'un logement en false
    */

    public static function MettreLogementNonDispo($id){
        require 'connexion.php' //Contient la clase de connexion a la base de donnees
        $bdd = new BaseDeDonnees(); //Creation objet qui peut ce connecter avec les indentifiant dans connexion
        $basededonnees = $bdd->pdo; 
        $SQL_UPDATE_LOGEMENTDISPOFALSE = "UPDATE logement SET disponibilite=0 WHERE id=:id"; //Set le logement donner par l'id comme indisponible
        $requete = $basededonnees->prepare($SQL_RECUPERE_LOGEMENTDISPOFALSE); //Preparaiton de la requete
        $requete->bindParam(":id", $id); //Assignement des valeurs
        $requete->execute(); //execution

    }
```

4 - Ajouter un api :

Dans le fichier Api/ creer un fichier API pour les fonctions creer au dessus.

Exemple avec MettreLogementNonDIspo():

Creer le fichier Api/MettreLogementPasDispo.php

```php
<?php
header('Access-Control-Allow-Origin: *'); // Necessaire au fonctionnement
require_once "../Dao/LogementDao.php"; // Appelle le DAO
$id = filter_var($_POST["id"], FILTER_SANITIZE_NUMBER_INT); //Recuperer l'id qui seras envoyer dans par le DAO client en POST
$logement = LogementDao::MettreLogementNonDispo($id); //Appelle la fonction recuperer
?>
```


## Coter DAO client :

1- Dans Dao/logementDao.js ajouter les appelles vers l'api

Les appelles vers l'api se font avec la fonction fetch de javascript
exemple avec MettreLogement non dispo :

```javascript
static async reserverLogement(id) { //Id d'un logement passer en entrer
    let logement;
    let data = new FormData(); //Necessaire pour le poste
    data.append("id", id);//On ajouter l'id dans la formdata creer
    await fetch("https://www.mobile.beldevca.xyz/Api/MettreLogementPasDispo.php", { //Url de l'api creer sur le serveur distant
      method: "POST",
      body: data,
    })
  }
```

2- Modifier le modele JS, ce rendre dans le dossier model/Logement.js et ajouter le champ disponibiliter :

```javascript
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
  /**@type boolean*/ // Ligne ajouter
  disponible;
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
   * @param {boolean} disponible // Ligne ajouter
   */
  constructor(nom, description, image, ville, province, codePostal, pays, lattitude, longitude, prix, id,disponible) { //NE pas oublier d'ajouter disponible au constructeur
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
    this.dispnobile = disponible; //Ligne ajouter
  }
}

```
3 - Retourner dans le DAO et ajouter data.disponible au fonction deja existantes dans le .then((data) => {... juste apres le data.id

4 - Ajouter une partie dans le template de l'accueil pour afficher la disponibilites 

```html
<template id="template-appercu-logement">
      <a href="#logement/" class="appercu-logement">
        <img class="accueilimg" src="images/cegep.jpeg" />
        <p class="nom"></p>
        <p class="adresse"></p>
        <p class="prix"></p>
        <p class="disponibilite"></p> <!-- Ligne ajouter -->
      </a>
    </template>
```

5 - Modifier vueAccueil.js pour afficher l'information de diponibiliter

```javascript
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
      if(logement.disponible){ // partie ajouter
        var dispoString = "Disponible";
      } else {
        var dispoString = "Non Disponible";
      }
      logementAffiche.querySelector(".disponible").textContent = `${logement.disponible}; // Fin partie ajouter
      document.getElementById("accueil").appendChild(logementAffiche);
    });
  }
}
```
6 - AJouter le code vue Detail qui appelle la fonction pour mettre en non Disponible

```javascript
 import App from "../App.js";
import LogementDao from "../Dao/LogementDao.js";

export default class VueDetail {
  constructor() {
    this.vueTemplate = document.getElementById("template-detail");
    this.actionReserve = null; //Ajouter pour stocker laction depuis app.js
    this.id = null; //Ligne ajouter
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
    this.id = logement.id;
    App.page.replaceChildren(logementAffiche);
    App.footer.colorerBouton();
    document.getElementById("reservation").addEventListener("submit",evenement => this.reserver(evenement));
  }

  initialiserActionReserver(actionReserve){ //Appeller depuis App.js
    this.actionReserve = actionReserve;
  }

  reserver(evenement){ //Levenement appelle la fonction dao intiliaser depuis App.js
    evenement.preventDefault();
    this.actionReserver(this.id);
  }
}

```

7 - Effectuer l'appelle a la fonction Dao dans App.js

```javascript
import LogementDao from "./Dao/LogementDao.js";
import FiltresLogment from "./model/FiltresLogement.js";
import Logement from "./model/Logement.js";
import VueAccueil from "./vue/VueAccueil.js";
import VueDetail from "./vue/VueDetail.js";
import VueFooter from "./vue/VueFooter.js";
import VueRecherche from "./vue/VueRecherche.js";

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
    this.vueRecherche.initialiserActionFiltre(filtres => this.actionFiltrerResultat(filtres));
    this.vueDetail.initialiserActionReserve(id => this.actionReserve(id)); //LIgne ajouter
    this.longitude = null;
    this.latitude = null;

    this.initialiserNavigation();
    document.addEventListener("deviceready", (e) => {
      console.log("device ready");
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      });
    });
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
    } else if (hash.match(/^#recherche/)) {
      this.vueRecherche.afficher(this.logements,this.longitude,this.latitude);
    } else if ((navigation = hash.match(/^#logement\/([\d]+)/))) {
      let id = navigation[1];
      this.vueDetail.afficher(id);
    }
  }

  async actionFiltrerResultat(filtres){
    var logementFiltrer =  await LogementDao.ListerLogement(filtres,0);
    if(logementFiltrer.length > 0){
      var logementAcceuil =  await LogementDao.ListerLogement(filtres,10);
      this.logements = logementAcceuil;
    }
    this.vueRecherche.afficherNouveauResultat(logementFiltrer);
  }
//fonction ajouter
  async reserve()id{ //Async car appelle avec fetch dans le ado
    var reservation = await LogementDao.reserverLogement(id)
    this.vueAcceuil.afficher(this.logements);
  }
}

new App(window);
```

8 - Il faudras egalement ajouter une condition sur l'affichage du bouton reserver. Il faut egelament faire de meme avec la fonction pour rendre un logement disponible apres mais de facon automatique plutot qu'avec l'appui d'un bouton.
