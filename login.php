<?php
    require_once('include/common.inc.php');
    
    if (isUserLogin()) {
        redirect('game.php');
    }
    
    $messages = [
        ERR_USER_REGISTRATION_DONE => "Вы зарегистированы",
        ERR_USER_REGISTRATION_FAIL => "В регистрации отказано, попробуйте другие данные",
        ERR_USER_REGISTRATION_WRONG_DATA => "Неверная пара email/пароль",
        ERR_USER_REGISTRATION_WRONG_EMAIL => "Такая почта уже зарегистирована"
    ];
    $messageId = isset($_GET["result"]) ? ($_GET["result"]) : 0;
    $message = isset($messages[$messageId]) ? $messages[$messageId] : "";
    $varss = array(
      'titleText' => 'Войти/Зарегистироваться',
      'message' => $message    
      );
    $vars = [];

    echo getView('login.html.twig', $vars);