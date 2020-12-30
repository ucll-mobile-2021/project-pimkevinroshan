<?
require("database/database-connect.php");
$userID = $_GET["userID"];
$points = $_GET["points"];

if ($points != null) {
    $stmt = $mysqli->prepare("UPDATE `users` SET points = ? WHERE userID = ?");
    $stmt->bind_param('is', $points, $userID);
    $stmt->execute();
}

$stmt = $mysqli->prepare("UPDATE `cart` SET payed = 1 WHERE userID = ?");
$stmt->bind_param('s', $userID);
$stmt->execute();
$stmt->close();
$mysqli->close();


header('Location: /handleUser.php?userID=' . $userID);