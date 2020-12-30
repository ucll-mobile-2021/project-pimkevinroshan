<?php
$productID = $_GET["productID"];
$userID = $_GET["userID"];

require("database/database-connect.php");
$stmt = $mysqli->prepare("SELECT p.id, p.barcode, p.description, p.price, p.unitPrice, c.quantity FROM `products` p LEFT JOIN (select * from `cart` WHERE userid = ? AND payed=0) c ON p.id = c.productID WHERE p.barcode= ?");
$stmt->bind_param('si', $userID, $productID);
$stmt->execute();
$result = $stmt->get_result();
$product = $result->fetch_assoc();

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$productParsed = parseProduct($product['id'], $product['quantity'], $product['barcode'], $product['description'], $product['price'], $product['unitPrice']);

function parseProduct($id, $quantity, $barcode, $description, $total, $unitprice) {
  if($quantity==null) {
    $quantity = 1;
  }
  $item = new \stdClass();
  $item->id = $id;
  $item->quantity = $quantity;
  $item->barcode = $barcode;
  $item->description = $description;
  $item->price = $total;
  $item->unitprice = $unitprice;
  return $item;
}

$JSON = json_encode($productParsed);

echo $JSON;
