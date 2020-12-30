<?
require("database/database-connect.php");
$userID = $_GET["userID"];

$stmt = $mysqli->prepare("SELECT p.id, p.barcode, p.description, p.price, p.unitPrice, c.quantity FROM `cart` c INNER JOIN `products` p on c.productID = p.id WHERE userID = ? AND c.payed=0 order by c.id");
$stmt->bind_param('s', $userID);
$stmt->execute();
$products = $stmt->get_result();
$productCount = mysqli_num_rows($products);

$stmt = $mysqli->prepare("SELECT * FROM `users` where userID = ?");
$stmt->bind_param('s', $userID);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$stmt->close();
$mysqli->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>For The Record</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
    <!-- Bootstrap -->
    <link href="css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
        body { padding-top:0px; }
        .form-control { margin-bottom: 10px; }
        td {
            height: 50px;
            vertical-align: middle;
        }
    </style>
</head>
<body>

<nav class="navbar navbar-inverse navbar-fixed-top sticky">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">App Mobiele Toepassingen </a>
        </div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
        </ul>
    </div>
</nav>
<br>
<br>
<br>

<div class="container">
    <br><br>
    <h2>User</h2><br>
    <b>First Name: </b> <? echo $user['fName'];?><br>
    <b>Last Name: </b> <? echo $user['lName'];?><br>
    <b>Email: </b> <? echo $user['email'];?><br>
    <b>Delhaize Points: </b> <? echo $user['points'];?><br>

    <h2>Cart</h2><br>

    <? if ($productCount>0) {?>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Barcode</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
        </tr>
        </thead>
        <tbody>
        <?
        $totalCost = 0;
        while ($product = $products->fetch_assoc()) {
            $totalCost += $product["price"] * $product["quantity"];
            ?>
            <tr>
                <td><?php echo $product["barcode"];?></td>
                <td><? echo $product["description"];?></td>
                <td><? echo $product["quantity"];?></td>
                <td><? echo $product["unitPrice"];?></td>
                <td>€<? echo number_format((float)$product["price"], 2, ',', '');?></td>
            </tr>
        <?}
        if ($user['points'] != null){
            $newPoints = round($totalCost) + $user['points'];
        }
        ?>
        </tbody>
    </table>
        <h3>Total cart price: €<?echo number_format((float)$totalCost, 2, ',', ''); ?></h3>
    <?} else {?>
    <h3>No products in cart!</h3>
    <?}?>
    <br><br>

    <? if ($user['points'] != null && $user['points'] >= 500){?>
        <a href="./printCoupon.php?userID=<? echo $userID;?>&points=<? echo $user['points'];?>" type="button" class="btn btn-primary">Print €5 coupon</a>
    <?} else {?>
        <button type="button" class="btn btn-primary" disabled>Print €5 coupon</button>
    <?}?>
    <? if ($productCount>0) {?>
    <a href="./confirmPayment.php?userID=<? echo $userID;?>&points=<? echo $newPoints;?>" type="button" class="btn btn-primary">Confirm payment</a>
    <?} else {?>
        <button type="button" class="btn btn-primary" disabled>Confirm payment</button>
    <?}?>
</div>

<!-- Add Footer -->
<?require("layout/footer.php");?>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
</body>
</html>

