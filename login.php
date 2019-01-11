<?php
    require_once('include/common.inc.php');
    
    if (isUserLogin()) {
        redirect('game.php');
    }
    
    $messages = [
        ERR_USER_REGISTRATION_DONE => "Вы зарегистированы, войдите в учетную запись",
        ERR_USER_REGISTRATION_FAIL => "В регистрации отказано, попробуйте другие данные",
        ERR_USER_REGISTRATION_WRONG_DATA => "Неверная пара email/пароль",
        ERR_USER_REGISTRATION_WRONG_EMAIL => "Такая почта уже зарегистирована",
        ERR_USER_REGISTRATION_WRONG_NAME => "Такое имя уже зарегистрировано"
    ];
    $messageId = isset($_GET["result"]) ? ($_GET["result"]) : 0;
    $message = isset($messages[$messageId]) ? $messages[$messageId] : "";
    $vars = array(
      'titleText' => 'Войти/Зарегистироваться',
      'message' => $message    
      );

    echo getView('login.html.twig', $vars);