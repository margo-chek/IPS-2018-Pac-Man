<?php
    require_once('../include/common.inc.php');

    if(empty($_GET['id'])) {
        redirect('/index.php');
    }
    
    $id = $_GET['id'];
    
    if (flipRight($id)) {
        redirect('/users.php?result=' . ALL_RIGHT);
    } else {
        redirect('/users.php?result=' . FAIL);
    }