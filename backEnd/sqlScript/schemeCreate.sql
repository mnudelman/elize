--CREATE DATABASE IF NOT EXISTS elize ;
-- таблица типов дополнительных сигналов
CREATE TABLE IF NOT EXISTS add_signals_types (
 typeid INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
 type_name  VARCHAR (50),
 comment VARCHAR (100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

-- таблица  дополнительных сигналов
DROP TABLE add_signals ;
CREATE TABLE IF NOT EXISTS add_signals (
 id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
 typeid INTEGER REFERENCES add_signals_types(typeid),
 file_name  VARCHAR (100),
 name VARCHAR (100) UNIQUE ,
 rang INTEGER  ,
 text TEXT
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ;