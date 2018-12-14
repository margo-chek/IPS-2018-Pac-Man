<?php
    require_once('../include/common.inc.php');
     
    if (!isUserLogin()) {
        redirect('/index.php');
    }
    
    if (!isCorrectPass($_SESSION['user_id'], $_POST['oldPass'])) {
        redirect('/edit_profile.php?result=' . BAD_PASS);
    }
  
    if ($_POST['pass1'] != $_POST['pass2']) {
        redirect('/edit_profile.php?result=' . FAIL);
    }
  
    $userData['pass'] = $_POST['pass1'];
    $userData['id'] = $_SESSION["user_id"];
        
    if (updatePassword($userData)) {
        redirect('/edit_profile.php?result=' . ALL_RIGHT);
    } else {
        redirect('/edit_profile.php?result=' . FAIL);
    }