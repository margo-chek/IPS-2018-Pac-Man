<?php
    function isUserExistByEmail($email)
    {
        $query = 'SELECT * FROM users WHERE email ="' . dbQuote($email) . '"';
        $result = dbQueryGetResult($query);
        return (!empty($result));
    }
    
    
    function createUser($email, $passHash, $name, $subname)
    { 
        $query = "INSERT INTO users (email, passHash, Name, Subname) 
                  VALUES('" . dbQuote($email) . "', '" . dbQuote($passHash) . "', 
                  '" . dbQuote($name) . "', '" . dbQuote($subname) . "')";
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
    
    function isAdmin() 
    {
        if (!isUserLogin()) {
            return false;
        }
        $userId = $_SESSION['user_id'];
        $query = 'SELECT rights FROM users WHERE id = ' . $userId;
        $result = dbQueryGetResult($query);
        if (!empty($result)) {
            return ($result[0]["rights"] == "admin");
        }
    }
    
    function logout()
    {
        $_SESSION['user_id'] = null;
    }
    
    
    function getUsersData()
    {
        $query = 'SELECT id, name, subname, email, rights, ban FROM users';
        return dbQueryGetResult($query);
    }
    
    function isUserBan($id)
    {
        $query = 'SELECT ban FROM users 
                  WHERE id = "' . dbQuote($id) . '"';
        $result = dbQueryGetResult($query);
        if (empty($result )) {
            return false;
        }
        return ($result[0]['ban'] == '1');
    }
    
    function flipBan($id)
    {
        if (isUserBan($id)) { 
            $query = 'UPDATE users 
                      SET ban = "0" 
                      WHERE id = "' . dbQuote($id) . '"';
        } else {
            $query = 'UPDATE users 
                      SET ban = "1" 
                      WHERE id = "' . dbQuote($id) . '"';
        }
        
        return dbQuery($query);
    }
    
    function getUserRight($id){
        $query = 'SELECT rights FROM users 
                  WHERE id = ' . dbQuote($id);
        $result = dbQueryGetResult($query);
        if (empty($result)) {
            return 'noUser';
        }
        if ($result[0]['rights'] == 'user') {
            return 'user';
        } else {
            return 'admin';
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
        $query = 'SELECT email, Name, Subname, img
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
                      Subname = "' . dbQuote($userData['subname']) . '",
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
    
    function deleteAvatar()
    {
        $query = 'UPDATE users
                    SET
                        img = NULL
                    WHERE
                        id = "' . dbQuote($_SESSION['user_id']) . '"';
        dbQuery($query);
    }
    function updateUserImg($userData)
    {   
        $image = dbQuote($userData['path']);
        $query = 'UPDATE users
                  SET
                      img = "' . $image . '"
                  WHERE
                      id = "' . dbQuote($userData['id']) . '"';
                      
        return dbQuery($query);
    }
    
    
    function getUserData($id)
    {
        if ($id == NULL) {
            return false;
        }
        $query = '
                  SELECT
                      Name, Subname, img
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
                  || !empty($_POST['pass2']) || !empty($_POST['name']) 
                      || !empty($_POST['subname'])); 
    }
    
    function validateUpdateUserRequestData()
    {
        return (validateAddUserRequestData() AND empty($_POST['oldPass']));
    }