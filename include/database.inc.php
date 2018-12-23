<?php
$g_dbLink = null;

//создает подключение к БД
function dbInitialConnect()
{
    global $g_dbLink;
    $g_dbLink = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);
    $error = mysqli_connect_error();
    if ($error) {
        die('Unable to connect to DB');
    }
}
//делает запрос к базе данных и возвращает true в случае удачи и наоборот
function dbQuery($query)
{
    global $g_dbLink;
    $result = mysqli_query($g_dbLink, $query);
    return ($result != false);
}
//экранирует символы
function dbQuote($value)
{
    global $g_dbLink;
    return mysqli_real_escape_string($g_dbLink, $value);
}
//возвращает последний вставленный id
function dbGetLastInsertId()
{
    global $g_dbLink;
    return mysqli_insert_id($g_dbLink);
}
function dbQueryGetResult($query)
{
    global $g_dbLink;
    $data = [];
    $result = mysqli_query($g_dbLink, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result))
            array_push($data, $row);
        mysqli_free_result($result);
    }

    return $data;
}
