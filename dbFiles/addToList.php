<?
require("database/database-connect.php");
$productID = $_GET["productID"];
$userID = $_GET["userID"];

$stmt = $mysqli->prepare("REPLACE INTO `shoppinglist` (`userID`, `productID`) VALUES (?, ?)");
$stmt->bind_param('si', $userID, $productID);
$stmt->execute();

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$JSON = json_encode("succes");

echo $JSON;
