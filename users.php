<?php
    require_once('include/common.inc.php');
    
    $messages = [
        ALL_RIGHT => "Выполнено",
        FAIL => "Не удалось выполнить"
    ];
    $messageId = isset($_GET["result"]) ? ($_GET["result"]) : 0;
    $message = isset($messages[$messageId]) ? $messages[$messageId] : "";
    
    if (!isAdmin()) {
        redirect('/index.php');
    }
   
    $vars = array(
        'headerData' => loadHeaderLinks(),
        'titleText' => 'Редактирование пользователей',
        'message' => $message,
        'users' => getUsersData()
    );

    echo getView('users.twig', $vars);