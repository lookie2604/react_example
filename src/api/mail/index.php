<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

/*$restJson = file_get_contents("php://input");
$_POST = json_decode($restJson, true);

if ($_POST) {
    http_response_code(200);
    echo json_encode(array(
        "sent" => true, "message" => $_POST
    ));
} else {
    echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}*/

$response = json_encode(["sent" => false, "message" => "das ist ein test"]);

echo json_encode($response);

echo '<script type="text/javascript">
        var myApp = {
            response : '. json_encode(["sent" => false, "message" => "das ist ein test"]).';
        };
        </script>
        <script defer="" src="/static/js/bundle.js"></script>';