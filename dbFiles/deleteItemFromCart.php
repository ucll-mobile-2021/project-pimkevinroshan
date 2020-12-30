<?php
$productID = $_GET["itemID"];
$userID = $_GET["userID"];

require("database/database-connect.php");
$stmt = $mysqli->prepare("DELETE FROM `cart` WHERE productID in (SELECT id FROM `products` WHERE barcode = ?) AND userID = ? and payed=0");
$stmt->bind_param('is', $productID, $userID);
$stmt->execute();
$result = $stmt->get_result();

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$JSON = json_encode("succes");

echo $JSON;
