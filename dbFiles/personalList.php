<?php
$userID = $_GET["userID"];

require("database/database-connect.php");
$stmt = $mysqli->prepare("SELECT s.productID, p.description, p.price, p.unitPrice FROM `shoppinglist` s INNER JOIN `products` p ON s.productID = p.id  WHERE s.userID = ? ORDER BY s.id");
$stmt->bind_param('s', $userID);
$stmt->execute();
$result = $stmt->get_result();

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$listContents = [];
$itemCount = 0;

while ($product = $result->fetch_assoc()) {
  $itemCount ++;
  $listContents = addToCart($listContents, $product['productID'], $product['description'], number_format((float)$product['price'], 2, ',', ''), $product['unitPrice']);
}

function addToCart($listContents, $id, $description, $total, $unitprice) {
  $item = new \stdClass();
  $item->id= $id;
  $item->description = $description;
  $item->total = $total;
  $item->unitprice = $unitprice;
  array_push($listContents, $item);
  return $listContents;
}

$list = new \stdClass();
$list->products = $listContents;
$list->items = $itemCount;

$JSON = json_encode($list);

echo $JSON;
