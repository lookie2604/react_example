<?php
// php -S localhost:8000
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
//header("Content-type:application/json");

/*$restJson = file_get_contents("php://input");
$_POST = json_decode($restJson, true);

if ($_POST) {
    http_response_code(200);
    echo json_encode(array(
        "sent" => true, "message" => $_POST
    ));
} else {
    echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}
*/

