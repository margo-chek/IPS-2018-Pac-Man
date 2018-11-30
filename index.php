<?php
header('Content-Type: text/html; charset = utf-8');

require_once('index.html');

if(!empty($_POST))
{
    //print_r ($_POST);

    echo "<br> Логин: " . $_POST["login"];
    echo "<br>  Пароль: " . $_POST["password"];

}


/*
http://localhost/pacman/index.php
*/