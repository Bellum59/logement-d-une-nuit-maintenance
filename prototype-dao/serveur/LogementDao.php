<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/modele/Logement.php";

class LogementDao{

    /*
    * Recuperer un objet logement en fournissant un Id
    */

    public static function RecupererUnLogementParId($id){
        require_once 'connexion.php';
        $bdd = new BaseDeDonnees();
        $basededonnees = $bdd->pdo;
        $SQL_RECUPERE_LOGEMENT = "SELECT * FROM logement WHERE id=:id";
        $requete = $basededonnees->prepare($SQL_RECUPERE_LOGEMENT);
        $requete->bindParam(":id",$id);
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
    public static function RecupererListeFiltrer($arrayFiltre = []){
        require_once 'connexion.php';
        $bdd = new BaseDeDonnees();
        $basededonnees = $bdd->pdo;
        $SQL_RECUPERE_LOGEMENT_FILTRER = "SELECT * FROM logement WHERE longitude >= :minLon AND longitude <= :maxLon AND lattitude >= :minLat AND lattitude <= :maxLat";

        /*
        * Fonction pour recup la distance : https://stackoverflow.com/questions/37578301/php-calculate-latitude-longitude-which-is-nearer-than-50-km
        */
        if(isset($arrayFiltre["distance"])){
            $distance = $arrayFiltre["distance"];
        }else{
            $distance = 2 ;// Valeur par defaut 2km pour seulement ville de Quebec
        }

        $lat = $arrayFiltre["lattitude"] ?? 46.8138; //latitude Valeurs par défaut pour Québec
        $lon = $arrayFiltre["longitude"] ?? -71.2399; //longitude 
        $distance = 0.5; //your distance in KM
        $R = 6371; //constant earth radius. You can add precision here if you wish

        $maxLat = $lat + rad2deg($distance/$R);
        $minLat = $lat - rad2deg($distance/$R);
        $maxLon = $lon + rad2deg(asin($distance/$R) / cos(deg2rad($lat)));
        $minLon = $lon - rad2deg(asin($distance/$R) / cos(deg2rad($lat)));
        //Verification si un ou plusieurs filtres prix sont envoyer
        if(isset($arrayFiltre["prixMin"])){
            $SQL_RECUPERE_LOGEMENT_FILTRER = $SQL_RECUPERE_LOGEMENT_FILTRER." AND prix >= :prixMin";
            $prixMin = $arrayFiltre["prixMin"];
        }
        if(isset($arrayFiltre["prixMax"])){
            $SQL_RECUPERE_LOGEMENT_FILTRER = $SQL_RECUPERE_LOGEMENT_FILTRER." AND prix <= :prixMax";
            $prixMax = $arrayFiltre["prixMax"];
        }

        $requete = $basededonnees->prepare($SQL_RECUPERE_LOGEMENT_FILTRER);
        //var_dump($requete);
        $requete->bindParam(":minLon",$minLon);
        $requete->bindParam(":maxLon",$maxLon);
        $requete->bindParam(":minLat",$minLat);
        $requete->bindParam(":maxLat",$maxLat);

        //Ajout des filtres prix si ils sont set
        if(isset($arrayFiltre["prixMin"])){
            $requete->bindParam(":prixMin",$prixMin);
        }
        if(isset($arrayFiltre["prixMax"])){
            $requete->bindParam(":prixMax",$prixMax);
        }

        //Execution de la requete
        $requete->execute();
        $logements = $requete->fetchAll(PDO::FETCH_ASSOC);
        return array_map(fn($logement) => new Logement($logement), $logements);
    }
}

$logementTest = new LogementDao();
$test["lattitude"] = 46.8138;
$test["longitude"] = -71.2399;
$test["prixMin"] = 30;
$test["prixMax"] = 200;
//var_dump($logementTest->RecupererUnLogementParId(1));
//var_dump($logementTest->RecupererListeFiltrer($test));

?>