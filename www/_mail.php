<?php

include(__DIR__ . '/../vendor/mandrill/mandrill/src/Mandrill.php');
$mandrill = new Mandrill('FPsSJwpF5OF4Ns0CWkS5ng');

function getPost($key, $default = '')
{
    return isset($_POST[$key]) ? $_POST[$key] : $default;
}

function sendJson($status, $message, $code = 200)
{
    header('Content-Type: application/json');
    http_response_code($code);
    echo json_encode([
        'success' => boolval($status),
        'message' => $message,
    ]);
    exit;
}
