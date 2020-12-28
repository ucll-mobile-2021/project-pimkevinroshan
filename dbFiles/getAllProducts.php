<?php
$userID = $_GET["userID"];

require("database/database-connect.php");
$stmt = $mysqli->prepare("SELECT * FROM `products` WHERE NOT id in (SELECT productID from `shoppinglist` WHERE userID = ?)");
$stmt->bind_param('s', $userID);
$stmt->execute();
$result = $stmt->get_result();

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$products = [];
$productCount = 0;

while ($product = $result->fetch_assoc()) {
  $productCount++;
  $products = addToProducts($products, $product['id'], $product['barcode'], $product['description'], number_format((float)$product['price'], 2, ',', ''), $product['unitPrice']);
}

function addToProducts($products, $id, $barcode, $description, $total, $unitprice) {
  $item = new \stdClass();
  $item->id= $id;
  $item->barcode = $barcode;
  $item->description = $description;
  $item->price = $total;
  $item->unitprice = $unitprice;
  array_push($products, $item);
  return $products;
}

$db = new \stdClass();
$db->products = $products;
$db->items = $productCount;

$JSON = json_encode($db);

echo $JSON;
