<?php
header('Content-Type: text/html; charset=utf-8');
//require_once('include/common.inc.php');


require_once('index.html');

if(!empty($_POST))
{
    //print_r ($_POST);

    echo "<br> Логин: " . $_POST["login"];
    echo "<br>  Пароль: " . $_POST["password"];

}
$vars = [];
//echo getView('main.html.twig');

//echo getView('main.html.twig', $vars);

/*
http://localhost/pacman/index.php
*/