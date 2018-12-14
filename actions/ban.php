<?php
    require_once('../include/common.inc.php');
    if (!isAdmin()) {
        redirect('/index.php');
    } 
    
    if(empty($_GET['id'])) {
        redirect('/index.php');
    }
    
    $id = $_GET['id'];
    
    if (flipBan($id)) {
        redirect('/users.php?result=' . ALL_RIGHT);
    } else {
        redirect('/users.php?result=' . FAIL);
    }