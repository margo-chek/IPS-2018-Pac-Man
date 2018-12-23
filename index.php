<?php
header('Content-Type: text/html; charset=utf-8');
require_once('include/common.inc.php');


//require_once('game.html');

$vars = array(
    'isUserLogin' => isUserLogin(),
);
//echo getView('index.html.twig');

echo getView('index.html.twig', $vars);

/*
http://localhost/pacman/index.php
*/