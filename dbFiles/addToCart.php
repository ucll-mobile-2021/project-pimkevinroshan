<?
require("database/database-connect.php");
$productID = $_GET["productID"];
$userID = $_GET["userID"];
$quantity = $_GET["quantity"];

$stmt = $mysqli->prepare("DELETE FROM `shoppinglist` WHERE productID = ? AND userID = ?");
$stmt->bind_param('is', $productID, $userID);
$stmt->execute();

$stmt = $mysqli->prepare("SELECT * FROM `cart` WHERE productID = ? AND userID = ? AND payed=0");
$stmt->bind_param('is', $productID, $userID);
$stmt->execute();
$result = $stmt->get_result();
$quantityRow = $result->fetch_assoc();
if($quantityRow['quantity']==null){
  $stmt = $mysqli->prepare("INSERT INTO `cart` (`id`, `userID`, `productID`, `quantity`) VALUES (NULL, ?, ?, ?)");
  $stmt->bind_param('sii', $userID, $productID, $quantity);
  $stmt->execute();
} else {
  $stmt = $mysqli->prepare("UPDATE `cart` SET quantity = ? WHERE productID = ? AND userID = ?");
  $stmt->bind_param('iis', $quantity, $productID, $userID);
  $stmt->execute();
}

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$JSON = json_encode("succes");

echo $JSON;
