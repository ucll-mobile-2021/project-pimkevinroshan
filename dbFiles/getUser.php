<?php
$userID = $_GET["userID"];

require("database/database-connect.php");
$stmt = $mysqli->prepare("SELECT * FROM `users` where userID = ?");
$stmt->bind_param('s', $userID);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

$stmt->close();
$mysqli->close();

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$user = createUser($row['userID'], $row['fName'], $row['lName'], $row['email'], $row['points']);

function createUser($id, $fName, $lName, $email, $points) {
  $user = new \stdClass();
  $user->id= $id;
  $user->fName= $fName;
  $user->lName= $lName;
  $user->email= $email;
  $user->points= $points;
  return $user;
}

$JSON = json_encode($user);

echo $JSON;
