<?php
    function getScoreList($limit)
        {
            $query = 'SELECT users.name, results.score FROM results LEFT JOIN users on users.id = results.user_id ORDER BY (score) DESC limit  ' . dbQuote($limit) . '';
            $result = dbQueryGetResult($query);

            return ($result);
        }