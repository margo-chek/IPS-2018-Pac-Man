<?php
    require_once('../include/common.inc.php');
    var_dump($_POST);
    if (empty($_POST["score"])) {
        die();
    }
    $score = $_POST["score"];

    if (isUserLogin()) {
        $userId = $_SESSION['user_id'];
    } else {
        redirect("../login.php");
    }

    if (!saveScore($userId, $score)) {
        echo json_encode(CANT_SAVE_SCORE);
    }