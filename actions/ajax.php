<?php
    require_once('../include/common.inc.php');
        
    if (empty($_POST["book_id"])) {
        die();
    }
    $bookId = $_POST["book_id"];
    
    if (isUserLogin()) {
        $userId = $_SESSION['user_id'];
    } else {
        redirect($from);
    }
    
    
    likeBook($userId, $bookId);
    echo json_encode(getCountLikesBookById($bookId));