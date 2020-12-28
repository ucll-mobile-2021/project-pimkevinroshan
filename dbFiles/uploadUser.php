<?
require("database/database-connect.php");
$userID = $_GET["userID"];
$lName = $_GET["lName"];
$fName = $_GET["fName"];
$email = $_GET["email"];

$stmt = $mysqli->prepare("INSERT INTO `users` (`userID`, `fName`, `lName`, `email`) VALUES (?, ?, ?, ?)");
$stmt->bind_param('ssss', $userID, $fName, $lName, $email);
$stmt->execute();
$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$JSON = json_encode("succes");

echo $JSON;
