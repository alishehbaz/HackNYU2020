<?php

error_reporting(0);
$servername = "localhost";
$username = "root";
$password = "";

$conn = new mysqli($servername,$username,$password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully ";
echo "</br>";

$name = $_POST['uname'];
$password = $_POST['psw'];
mysqli_select_db( $conn, 'hacknyu');
//$query = mysqli_query($conn, "SELECT * FROM login where user_id = '$_POST[uname]' AND password = '$_POST[psw]'") or die(mysqli_error());
//$row = mysqli_fetch_array($query) or die(mysqli_error($conn));

$result = mysqli_query($conn, "SELECT user_id, password FROM login WHERE user_id = '$name' and password = '$password'")or die(mysqli_error($conn));


$row = mysqli_fetch_array($result);
$check = $_POST['done'];

if(isset($check) && $row["user_id"]==$name && $row["password"]==$password)
    echo"You are a validated user.";
else
    echo"Sorry, your credentials are not valid, Please try again.";

/*
if(isset($_POST['done'])){


//if(!empty($row['username']) AND !empty($row['pass']))
  if(($row['user_id'] == $_POST['uname']) AND ($row['password'] == $_POST['psw']))
{

     //$row['username'] == $row['pass'];
echo "SUCCESSFULLY LOGIN TO USER PROFILE PAGE...";

}
else {
 echo "SORRY... YOU ENTERD WRONG ID AND PASSWORD... PLEASE RETRY...";
}







} */





?>
