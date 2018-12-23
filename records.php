<?php
    require_once('include/common.inc.php');
    $scoreList = getScoreList(10); // получаем из таблицы записы с LIMIT 10
    $vars = array( // строим массив для твига с ключом records
        'records' => $scoreList,
    );
echo getView('records.html.twig', $vars);