<?php
header('Access-Control-Allow-Origin: *');
require_once "../Dao/LogementDao.php";
$arrayInfo = [];
if(!empty($_POST)){
    $arrayInfo["idLogement"] = $_POST["idLogement"];
    $arrayInfo["dateDebut"] = $_POST["dateDebutReservation"];
    $arrayInfo["dateFin"] = $_POST["dateFinReservation"];
    $arrayInfo["nomReservation"] = $_POST["nomReservation"];
    $arrayInfo["prenomReservation"] = $_POST["prenomReservation"];
    LogementDao::AjouterReservation($arrayInfo);
    echo json_encode("succes");
}

