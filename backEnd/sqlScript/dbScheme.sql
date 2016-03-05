-- Создание схемы БД elize
-- --------------------------------------
-- CREATE DATABASE IF NOT EXISTS elize ;
--drop table request_tree ;
CREATE TABLE IF NOT EXISTS request_tree (
  nodeid   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  parentid INTEGER DEFAULT 0,
  node_name    VARCHAR(255) ,
  typeid INTEGER REFERENCES node_types(typeid),
  node_valid INTEGER DEFAULT 1,
  node_default INTEGER DEFAULT 0,           // ветка по умолчанию
  comment VARCHAR(100) ,
  KEY index_parent (parentid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
-- --------------------------------------

CREATE TABLE IF NOT EXISTS node_types (
  typeid   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  type_name  VARCHAR (50),
  comment VARCHAR (100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
-- таблица имён собственных
CREATE TABLE IF NOT EXISTS ru_names (
 nameid INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
 name_text VARCHAR (100) NOT NULL DEFAULT '',
 KEY index_name (name_text)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
-- таблица склонений по падежам имён собственных
CREATE TABLE IF NOT EXISTS ru_name_synonyms (
 id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
 nameid INTEGER REFERENCES ru_names(nameid),
 synonym VARCHAR (100) NOT NULL DEFAULT '',
 KEY index_synonym (synonym)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
-- таблица типов дополнительных сигналов
CREATE TABLE IF NOT EXISTS add_signals_types (
 typeid INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
 type_name  VARCHAR (50),
 comment VARCHAR (100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
-- таблица  дополнительных сигналов
CREATE TABLE IF NOT EXISTS add_signals (
 id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
 typeid INTEGER REFERENCES add_signals_types(typeid),
 file_name  VARCHAR (100),
 name VARCHAR (100) UNIQUE ,
 rang INTEGER  ,
 text TEXT
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
