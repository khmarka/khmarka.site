<?php

try {
    include(__DIR__.'/./_mail.php');
    $to_email = 'ab@khmarka.com.ua';
    $from_email = getPost('email', 'noreply@khmarka.com.ua');

    $message = array(
        'text' => getPost('text', 'Ничего не написали :('),
        'subject' => 'Заявка от компании ' . getPost('company_name', 'не оставили имя компании :('),
        'from_email' => $from_email,
        'from_name' => getPost('name'),
        'to' => array(
            array(
                'email' => $to_email,
                'name' => 'Request Best Wallet',
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