<?php
header('Access-Control-Allow-Origin: *');
require_once "../Dao/LogementDao.php";
$arrayFiltre = [];
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
$resultat = LogementDao::RecupererListeFiltrer($arrayFiltre);
echo json_encode($resultat);
