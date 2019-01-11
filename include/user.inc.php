<?php
    function isUserExistByEmail($email)
    {
        $query = 'SELECT * FROM users WHERE email ="' . dbQuote($email) . '"';
        $result = dbQueryGetResult($query);
        return (!empty($result));
    }

    function isUserExistByName($name)
        {
            $query = 'SELECT * FROM users WHERE Name ="' . dbQuote($name) . '"';
            $result = dbQueryGetResult($query);
            return (!empty($result));
        }
    
    function createUser($email, $passHash, $name)
    { 
        $query = "INSERT INTO users (email, passHash, Name)
                  VALUES('" . dbQuote($email) . "', '" . dbQuote($passHash) . "', 
                  '" . dbQuote($name) . "')";
        return dbQuery($query);
    }
    
    function deleteUser($id)
    {
        $query = 'DELETE FROM users WHERE id =' . dbQuote($id);
        return dbQuery($query);
    }
    
    function isCorrectPass($id, $pass)
    {
        $query = 'SELECT passHash as hash
                 FROM
                    users
                 WHERE
                    id = "' . dbQuote($id) . '"';
        $hash = dbQueryGetResult($query);
        if ((md5($pass)) == $hash[0]['hash']) {
            return true;
        }
    }
    
    function findUserByLogin($login, $pass)
    {
        $userInfo = [];
        $query = "SELECT id from users u 
                  WHERE u.email = '" . dbQuote($login) . "' and u.passHash = '" . dbQuote(md5($pass)) . "'";
        $result = dbQueryGetResult($query);
        if(!empty($result)) {
            $userInfo = $result[0];
        }
        return $userInfo;
    }
    
    
    function saveSessionUser($userInfo)
    {
        if (!empty($userInfo['id'])) {
            $_SESSION['user_id'] = $userInfo['id'];
        }
    }
    
    
    function isUserLogin()
    {
        return (!empty($_SESSION['user_id']));
    }
    
    function getLoginUserId()
    {
        if (!isUserLogin()) {
            return false;
        }
        return $_SESSION['user_id'];
    }
    
    function logout()
    {
        $_SESSION['user_id'] = null;
    }
    
    
    function getUsersData()
    {
        $query = 'SELECT id, name, email, FROM users';
        return dbQueryGetResult($query);
    }
    
    function getUserRight($id){
        $query = 'SELECT rights FROM users
                  WHERE id = ' . dbQuote($id);
        $result = dbQueryGetResult($query);
        if (empty($result)) {
            return 'noUser';
        }
    }

    function flipRight($id) 
    {
        if (getUserRight($id) == 'user') { 
            $query = 'UPDATE users 
                      SET rights = "admin" 
                      WHERE id = "' . dbQuote($id) . '"';
        } elseif (getUserRight($id) == 'admin') {
            $query = 'UPDATE users 
                      SET rights = "user" 
                      WHERE id = "' . dbQuote($id) . '"';
        } else {
            return false;
        }
        return dbQuery($query);
    }
    
    function loadUserData($id) 
    {
        $query = 'SELECT email, Name
                  FROM users
                  WHERE id = ' . dbQuote($id) . '
                  ';
        $result = dbQueryGetResult($query);
        if (!empty($result)) {
            return $result[0];
        }
    }
    
    function updateUserName($userData) 
    {
        $query = 'UPDATE users
                  SET 
                      Name = "' . dbQuote($userData['name']) . '",
                      Email = "' . dbQuote($userData['email']) . '"
                  WHERE 
                      id = "' . dbQuote($userData['id']) . '"';
        return dbQuery($query);
    }
    
    function updatePassword($userData)
    {
        if (!empty($userData['pass'])) {
            $query = 'UPDATE users
                      SET 
                          passHash = "' . dbQuote(md5($userData['pass'])) . '"
                      WHERE 
                          id = "' . dbQuote($userData['id']) . '"';
            return dbQuery($query);
        } 
        return true;
    }
    

    function getUserData($id)
    {
        if ($id == NULL) {
            return false;
        }
        $query = '
                  SELECT
                      Name
                  FROM users
                  WHERE
                      id = "' . dbQuote($id) . '"
                  ';
        $result = dbQueryGetResult($query);
        return($result[0]);
    }
    
    function validateAddUserRequestData() 
    {
        return (!empty($_POST['email']) || !empty($_POST['pass1']) 
                  || !empty($_POST['pass2']) || !empty($_POST['name']));
    }
    
    function validateUpdateUserRequestData()
    {
        return (validateAddUserRequestData() AND empty($_POST['oldPass']));
    }