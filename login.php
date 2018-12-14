<?php
    require_once('include/common.inc.php');
    
    if (isUserLogin()) {
        redirect('/index.php');
    }
    
    $messages = [
        ERR_USER_REGISTRATION_DONE => "Вы зарегистированы",
        ERR_USER_REGISTRATION_FAIL => "В регистрации отказано, попробуйте другие данные",
        ERR_USER_REGISTRATION_WRONG_DATA => "Неверная пара email/пароль",
        ERR_USER_REGISTRATION_WRONG_EMAIL => "Такая почта уже зарегистирована",
        ERR_USER_REGISTRATION_BAN => "Учетная запись заблокирована"
    ];
    $messageId = isset($_GET["result"]) ? ($_GET["result"]) : 0;
    $message = isset($messages[$messageId]) ? $messages[$messageId] : "";
    $vars = array(
      'activeMenu' => '4', 
      'headerData' => loadHeaderLinks(),
      'titleText' => 'Войти/Зарегистироваться',
      'message' => $message    
      );
    
    echo getView('login.twig', $vars);