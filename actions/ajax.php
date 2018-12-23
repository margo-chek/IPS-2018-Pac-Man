<?php
    require_once('../include/common.inc.php');
        
    if (empty($_POST["score_id"])) {
        die();
    }
    $bookId = $_POST["score_id"];
    
    if (isUserLogin()) {
        $userId = $_SESSION['user_id'];
    } else {
        redirect($from);
    }
    
    
    likeBook($userId, $score_id);
    echo json_encode(getCountLikesBookById($score_id));