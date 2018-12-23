при создании БД лучше заранее указать кодировку и пр.
CREATE DATABASE pacman
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci; 
USE pacman; // выбираем ее для использования

CREATE TABLE users
(id SERIAL,
email VARCHAR(255),
passHash VARCHAR(255),
name VARCHAR(255),
PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

SHOW tables; // посмотреть все таблицы

SELECT * FROM users;

SHOW COLUMNS FROM users;

CREATE TABLE results
(id SERIAL,
user_id VARCHAR(255),
name VARCHAR(255),
score INT DEFAULT 0,
PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

SHOW COLUMNS FROM results;

ALTER TABLE results
MODIFY name VARCHAR(255);

DROP TABLE results;  // удалить таблицу

INSERT INTO results
(user_id, score)
VALUES
('1', '2008'),
('2', '10');

SELECT * FROM results;  // посмотреть таблицу
DROP TABLE results;  // удалить таблицу

SELECT FROM results ORDER BY (score) DESC LIMIT 10; // по убыванию 10 показать

SELECT FROM results
LEFT JOIN users
ON users.id = results.user_id
ORDER BY (score) DESC LIMIT 10;

INSERT INTO results
(user_id, score)
VALUES
('1', '3010');