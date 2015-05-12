<?php

try {

    include(__DIR__.'/_mail.php');

    var links = array(
        "businessbank" => array(
            "name": "Business Bank",
            "android" => "",
            "ios" => "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffffb83c10ffffffd9ffffff9bfffffffaffffff95ffffffae4cffffffb7ffffffca5b75055442itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/1affffffae66ffffff91fffffff5ffffffb90278ffffffa3ffffffd0ffffff8affffff8bffffff844f19ffffffa4itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/1affffffae66ffffff91fffffff5ffffffb90278ffffffa3ffffffd0ffffff8affffff8bffffff844f19ffffffa4"
        ),
        "personalbank" => array(
            "name": "Personal Bank",
            "android" => "",
            "ios" => "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/1affffffae66ffffff91fffffff5ffffffb90278ffffffa3ffffffd0ffffff8affffff8bffffff844f19ffffffa4"
        ),
        "foodretail" => array(
            "name": "Food Retail",
            "android" => "",
            "ios" => "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/34ffffffdc48fffffff014ffffffda2effffffccffffffb51d4a1fffffffddffffffd8ffffffd7ffffffa2"
        ),
        "gazstation" => array(
            "name": "Gaz Stations",
            "android" => "",
            "ios" => "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffffd40bffffff941cffffffe319ffffffc9fffffff2521dffffff8d13ffffff9fffffffa54353"
        )
    );


    $to_email = getPost('email');
    $from_email = 'info@khmarka.com.ua';

    $app = links[0];
    $message = array(
        'html' => '<a href="'.$app->ios.'">Установить '.$app->name.'</a>',
        'subject' => $app->name . ' - ваше мобильное приложение без стартовых затрат',
        'from_email' => $from_email,
        'from_name' => 'Khmarka LLC',
        'to' => array(
            array(
                'email' => $to_email,
                'type' => 'to'
            )
        ),
        'headers' => array('Reply-To' => $from_email),
        'important' => true
    );
    $result = $mandrill->messages->send($message);
    if (!isset($result[0])) {
        sendJson(false, 'bad response from mandrill', 400);

    } else {
        if ($result[0]['status'] == 'sent') {
            sendJson(true, 'sent');
        } else {
            sendJson(false, sprintf('status: %s, reject_reason: %s', $result[0]['status'], $result[0]['reject_reason']));
        }
    }
} catch (Mandrill_Error $e) {
    sendJson(false, 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage(), 500);
}
?>