<?php
header('Access-Control-Allow-Origin: *');
require_once "../Dao/LogementDao.php";
$arrayFiltre = [];
$limite = filter_var($_POST["limite"], FILTER_SANITIZE_NUMBER_INT);
if (isset($_POST["longitude"])) {
    $arrayFiltre["longitude"] = filter_var($_POST["longitude"], FILTER_VALIDATE_FLOAT);
}
if (isset($_POST["latitude"])) {
    $arrayFiltre["latitude"] = filter_var($_POST["latitude"], FILTER_VALIDATE_FLOAT);
}
if (isset($_POST["distance"])) {
    $arrayFiltre["distance"] = filter_var($_POST["distance"], FILTER_VALIDATE_FLOAT);
}
if (isset($_POST["prixMin"])) {
    $arrayFiltre["prixMin"] = filter_var($_POST["prixMin"], FILTER_VALIDATE_FLOAT);
}
if (isset($_POST["prixMax"])) {
    $arrayFiltre["prixMax"] = filter_var($_POST["prixMax"], FILTER_VALIDATE_FLOAT);
}
$resultat = LogementDao::RecupererListeFiltrer($arrayFiltre, $limite);
echo json_encode($resultat);
