<?php
    require_once('include/common.inc.php');

    if (!isUserLogin()) {
        redirect('/index.php');
    }

    $id = $_SESSION['user_id'];

    $messages = [
        ALL_RIGHT => "Изменения внесены",
        FAIL => "Изменения не внесены",
        BAD_PASS => "Неправильный пароль"
    ];
    $messageId = isset($_GET["result"]) ? ($_GET["result"]) : 0;
    $message = isset($messages[$messageId]) ? $messages[$messageId] : "";

    $vars = array(
        'titleText' => 'Редактирование ваших данных',
        'message' => $message
      );
    echo getView('edit_user_data.twig', $vars);