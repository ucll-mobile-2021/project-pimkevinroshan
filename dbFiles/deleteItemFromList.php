<?php
$productID = $_GET["productID"];
$userID = $_GET["userID"];

require("database/database-connect.php");
$stmt = $mysqli->prepare("DELETE FROM `shoppinglist` WHERE productID = ? AND userID = ?");
$stmt->bind_param('is', $productID, $userID);
$stmt->execute();
$result = $stmt->get_result();

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$JSON = json_encode("succes");

echo $JSON;
