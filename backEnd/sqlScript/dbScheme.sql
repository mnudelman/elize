-- Создание схемы БД elize
-- --------------------------------------
-- CREATE DATABASE IF NOT EXISTS elize ;
--drop table request_tree ;
CREATE TABLE IF NOT EXISTS request_tree (
  nodeid   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  parentid INTEGER DEFAULT 0,
  node_name    VARCHAR(100) ,
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


