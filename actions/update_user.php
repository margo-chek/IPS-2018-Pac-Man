<?php
    require_once('../include/common.inc.php');
     
    if (!isUserLogin()) {
        redirect('/index.php');
    }
    
    if (!validateAddUserRequestData) {
        redirect('/index.php');
    } 
  
    $userData['name'] = $_POST['name'];
    $userData['email'] = $_POST['email'];
    $userData['pass'] = $_POST['pass1'];
    $userData['id'] = $_SESSION["user_id"];
        
    if (updateUserName($userData)) {
        redirect('/edit_profile.php?result=' . ALL_RIGHT);
    } else {
        redirect('/edit_profile.php?result=' . FAIL);
    }