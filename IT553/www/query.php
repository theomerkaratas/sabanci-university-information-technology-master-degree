<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

try {
    $pdo = new PDO("mysql:host=mysql;dbname=people;charset=utf8mb4", "root", "güçlü_bir_parola");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $body = json_decode(file_get_contents("php://input"), true);
    if (!isset($body["sql"]) || trim($body["sql"]) === "") {
        echo json_encode(["error" => "SQL sorgusu boş olamaz."]);
        exit;
    }

    $sql = $body["sql"];
    $stmt = $pdo->query($sql);

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
