<?php
$userID = $_GET["userID"];

require("database/database-connect.php");
$stmt = $mysqli->prepare("SELECT p.id, p.barcode, p.description, p.price, p.unitPrice, c.quantity FROM `cart` c INNER JOIN `products` p on c.productID = p.id WHERE userID = ? AND c.payed=0 order by c.id");
$stmt->bind_param('s', $userID);
$stmt->execute();
$result = $stmt->get_result();

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$cartContents = [];
$totalPrice = 0;
$itemCount = 0;

while ($product = $result->fetch_assoc()) {
  $itemCount ++;
  $price = $product['quantity'] * $product['price'];
  $totalPrice += $price;
  $cartContents = addToCart($cartContents, $product['id'], $product['barcode'], $product['quantity'], $product['description'], number_format((float)$price, 2, ',', ''), $product['unitPrice']);
}

function addToCart($cartContents, $id, $barcode, $items, $description, $total, $unitprice) {
  $item = new \stdClass();
  $item->id= $id;
  $item->barcode = $barcode;
  $item->items = $items;
  $item->description = $description;
  $item->total = $total;
  $item->unitprice = $unitprice;
  array_push($cartContents, $item);
  return $cartContents;
}

$cart = new \stdClass();
$cart->products = $cartContents;
$cart->items = $itemCount;
$cart->totalPrice = number_format((float)$totalPrice, 2, ',', '');

$JSON = json_encode($cart);

echo $JSON;
