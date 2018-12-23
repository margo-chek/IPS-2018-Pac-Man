<?php
    $currentWorkDir = getcwd();  
    chdir(dirname(__FILE__));
    //chdir($currentWorkDir);
    
    
    session_start();
    define('ROOT_DIR', dirname(dirname(__FILE__) . "../"));
    define('TEMPLATE_DIR', ROOT_DIR . '/template');
    require_once('config.inc.php');
    require_once('database.inc.php');
    require_once('../vendor/autoload.php');
    require_once('template.inc.php');
    require_once('autoloader.inc.php');

    dbInitialConnect(); //подключение к базе данных
