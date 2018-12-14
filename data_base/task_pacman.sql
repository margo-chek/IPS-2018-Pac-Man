при создании БД лучше заранее указать кодировку и пр.
CREATE DATABASE pacman
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci; 
USE pacman; // выбираем ее для использования

CREATE TABLE results
(user_id SERIAL,
nic_name VARCHAR(255) DEFAULT '',
score_date INT,
PRIMARY KEY (user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

ALTER TABLE customer 
MODIFY passport_code varchar(255);

DROP TABLE results;  // удалить таблицу

CREATE TABLE offers
(offers_id SERIAL,
dvd_id INT,
customer_id INT,
offers_date DATE,
return_date DATE,
PRIMARY KEY (offers_id),
FOREIGN KEY (dvd_id) REFERENCES dvd (dvd_id),
FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO results
(user_id, nic_name, score_date)
VALUES
('1', 'ABBA', '2008'),
('2', 'Beatles', '2010'),
('3', 'Depeche Mode', '2010'),
('4', 'Машина времени', '2016'),
('5', 'Scorpions', '2017');

SELECT * FROM results;  // посмотреть таблицу
DROP TABLE results;  // удалить таблицу

SELECT 
    COUNT(hdd_Gb) AS count,
    hdd_Gb
FROM results
GROUP BY (nic_name)
ORDER BY (score_date);