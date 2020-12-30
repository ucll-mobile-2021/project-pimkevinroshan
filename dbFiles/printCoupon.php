<?
require("database/database-connect.php");
$userID = $_GET["userID"];
$points = $_GET["points"];

$points -= 500;

$stmt = $mysqli->prepare("UPDATE `users` SET points = ? WHERE userID = ?");
$stmt->bind_param('is', $points, $userID);
$stmt->execute();
$stmt->close();
$mysqli->close();


header('Location: /handleUser.php?userID=' . $userID);