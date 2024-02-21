<?php
header('Access-Control-Allow-Origin: *');
require_once "../Dao/LogementDao.php";
$id = filter_var($_POST["id"], FILTER_SANITIZE_NUMBER_INT);
$logement = LogementDao::RecupererUnLogementParId($id);
echo json_encode($logement);
