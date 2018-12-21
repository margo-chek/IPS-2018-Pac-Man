<?php
    require_once('include/common.inc.php');

$vars = array('records' => array(
    array('position'=> '1', 'name' => 'Mark', 'score' => 200),
    array('position'=> '2', 'name' => 'John', 'score' => 400), 
    array('position'=> '3', 'name' => 'Bill', 'score' => 390),
    ));

echo getView('records.html.twig', $vars);