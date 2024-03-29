<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/modele/Logement.php";

class LogementDao
{

    /*
    * Recuperer un objet logement en fournissant un Id
    */

    public static function RecupererUnLogementParId($id)
    {
        require_once 'connexion.php';
        $bdd = new BaseDeDonnees();
        $basededonnees = $bdd->pdo;
        $SQL_RECUPERE_LOGEMENT = "SELECT * FROM logement WHERE id=:id";
        $requete = $basededonnees->prepare($SQL_RECUPERE_LOGEMENT);
        $requete->bindParam(":id", $id);
        $requete->execute();
        $logement = $requete->fetch(PDO::FETCH_ASSOC);
        return new Logement($logement);
    }


    /*
    * Recupere une liste de logement en fonction des filtres enregistrer
    * En input il s'agis dun array, les champs "longitude" et "lattitude" sont obligatoire
    * les champs "prixMin" et "prixMax" sont optionnel, "distance" l'est aussi mais 
    * prend une valeur par defaut si non renseigner.
    * Les pris sont en CAD et les distances en KMs
    */
    public static function RecupererListeFiltrer($arrayFiltre = [], $limite = 0)
    {
        require_once 'connexion.php';
        $bdd = new BaseDeDonnees();
        $basededonnees = $bdd->pdo;
        $SQL_RECUPERE_LOGEMENT_FILTRER = "SELECT * FROM logement WHERE longitude >= :minLon AND longitude <= :maxLon AND lattitude >= :minLat AND lattitude <= :maxLat";

        /*
        * Fonction pour recup la distance : https://stackoverflow.com/questions/37578301/php-calculate-latitude-longitude-which-is-nearer-than-50-km
        */
        if (isset($arrayFiltre["distance"])) {
            $distance = $arrayFiltre["distance"];
        } else {
            $distance = 2; // Valeur par defaut 2km pour seulement ville de Quebec
        }

        $lat = $arrayFiltre["latitude"] ?? 46.8138; //latitude Valeurs par défaut pour Québec
        $lon = $arrayFiltre["longitude"] ?? -71.2399; //longitude 
        $R = 6371; //constant earth radius. You can add precision here if you wish

        $maxLat = $lat + rad2deg($distance / $R);
        $minLat = $lat - rad2deg($distance / $R);
        $maxLon = $lon + rad2deg(asin($distance / $R) / cos(deg2rad($lat)));
        $minLon = $lon - rad2deg(asin($distance / $R) / cos(deg2rad($lat)));
        //Verification si un ou plusieurs filtres prix sont envoyer
        if (isset($arrayFiltre["prixMin"])) {
            $SQL_RECUPERE_LOGEMENT_FILTRER = $SQL_RECUPERE_LOGEMENT_FILTRER . " AND prix >= :prixMin";
            $prixMin = $arrayFiltre["prixMin"];
        }
        if (isset($arrayFiltre["prixMax"])) {
            $SQL_RECUPERE_LOGEMENT_FILTRER = $SQL_RECUPERE_LOGEMENT_FILTRER . " AND prix <= :prixMax";
            $prixMax = $arrayFiltre["prixMax"];
        }
        $SQL_RECUPERE_LOGEMENT_FILTRER .= " AND id NOT IN(SELECT idLogement FROM reservation WHERE dateFinReservation>NOW())";
        if ($limite > 0) {
            $SQL_RECUPERE_LOGEMENT_FILTRER .= " LIMIT :limite";
        }

       

        $requete = $basededonnees->prepare($SQL_RECUPERE_LOGEMENT_FILTRER);
        //var_dump($requete);
        $requete->bindParam(":minLon", $minLon);
        $requete->bindParam(":maxLon", $maxLon);
        $requete->bindParam(":minLat", $minLat);
        $requete->bindParam(":maxLat", $maxLat);

        //Ajout des filtres prix si ils sont set
        if (isset($arrayFiltre["prixMin"])) {
            $requete->bindParam(":prixMin", $prixMin);
        }
        if (isset($arrayFiltre["prixMax"])) {
            $requete->bindParam(":prixMax", $prixMax);
        }
        if ($limite > 0) {
            $requete->bindParam(":limite", $limite, PDO::PARAM_INT);
        }
        //Execution de la requete
        $requete->execute();
        $logements = $requete->fetchAll(PDO::FETCH_ASSOC);
        return array_map(fn ($logement) => new Logement($logement), $logements);
    }

    /*Recois un array contenant les informations pour une réservation et enregistre
    ces infos dans la base de données
    */
    public static function AjouterReservation($arrayInfo){
        require_once 'connexion.php';
        $bdd = new BaseDeDonnees();
        $basededonnees = $bdd->pdo;
        $SQL_AJOUTER_RESERVATION = "INSERT INTO reservation (idLogement, dateDebutReservation,dateFinReservation,nomReservation,prenomReservation,emailReservation) VALUES (:idLogement, :dateDebutReservation, :dateFinReservation, :nomReservation, :prenomReservation, :emailReservation)";
        $requete = $bdd->pdo->prepare($SQL_AJOUTER_RESERVATION);
        $requete->bindParam(":idLogement", $arrayInfo["idLogement"]);
        $requete->bindParam(":dateDebutReservation", $arrayInfo["dateDebut"]);
        $requete->bindParam(":dateFinReservation", $arrayInfo["dateFin"]);
        $requete->bindParam(":nomReservation", $arrayInfo["nom"]);
        $requete->bindParam(":prenomReservation", $arrayInfo["prenom"]);
        $requete->bindParam(":emailReservation", $arrayInfo["email"]);
        $requete->execute();
        return;
    }
}
