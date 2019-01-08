<?php
    require_once('../include/common.inc.php');

    $login = isset($_POST['email']) ? $_POST['email'] : '';
    $pass = isset($_POST['pass']) ? $_POST['pass'] : '';

    $userInfo = findUserByLogin($login, $pass);
    
    if (empty($userInfo)) {
        redirect('/login.php?result=' . ERR_USER_REGISTRATION_WRONG_DATA);
    }
    
    saveSessionUser($userInfo);
    redirect('../game.php');