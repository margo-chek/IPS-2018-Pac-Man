<?php
    require_once('../include/common.inc.php');

    if (!validateAddUserRequestData()) {
        redirect('../login.php?result=' . ERR_USER_REGISTRATION_FAIL);
    }
    $pass1 = $_POST['pass1'];
    $pass2 = $_POST['pass2'];

    if (strcmp($pass1, $pass2) !== 0) {
        redirect('../login.php?result=' . ERR_USER_REGISTRATION_FAIL);
    }
    
    $passHash = md5($pass1);

    $email = $_POST['email'];
    if (isUserExistByEmail($email)) {
        redirect('../login.php?result=' . ERR_USER_REGISTRATION_WRONG_EMAIL);
    }
    
    $name = $_POST['name'];

    if (createUser($email, $passHash, $name)) {
        redirect('../login.php?result=' . ERR_USER_REGISTRATION_DONE);
    } else {
        redirect('../login.php?result=' . ERR_USER_REGISTRATION_FAIL);
    }

    echo "Войдите в учетную запись";