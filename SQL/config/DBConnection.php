<?php
$servername = "localhost";
$username = "dm";
$password = "12345";
$db_name = "yaphub";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$db_name;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
