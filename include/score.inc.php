<?php
    function getScoreList($limit)
        {
            $query = 'SELECT users.name, results.score
            FROM results LEFT JOIN users on users.id = results.user_id
            ORDER BY (score) DESC limit  ' . dbQuote($limit) . '';
            $result = dbQueryGetResult($query);

            return ($result);
        }

    function saveScore($user_id, $score)
        {
            $query = 'INSERT INTO results (user_id, score) VALUES (' . dbQuote($user_id) . ', ' . dbQuote($score) . ')';
            $result = dbQuery($query);

            return ($result);
        }