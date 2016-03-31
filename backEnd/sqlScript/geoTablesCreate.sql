--
-- Структура таблицы `mlt_city`
--
--DROP TABLE mlt_city ;
CREATE TABLE IF NOT EXISTS `mlt_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `countryid` int(10) unsigned NOT NULL,
  `regionid` int(11) NOT NULL,
  `name` varchar(63)  NOT NULL,
  `size` enum('big','small','xsmall','tiny')  NOT NULL,
  `ordering` tinyint(3) NOT NULL DEFAULT '0',
  `ordering2` int(6) NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `params` text CHARACTER SET cp1251 NOT NULL,
  `alias` varchar(31) CHARACTER SET cp1251 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pub_region` (`published`,`regionid`),
  KEY `alias` (`alias`(3)),
  KEY `country_region_idx` (`countryid`,`regionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  AUTO_INCREMENT=130410 ;
--
-- Структура таблицы `mlt_city_ll`
--
CREATE TABLE IF NOT EXISTS `mlt_city_ll` (
  `cityid` int(10) unsigned NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  PRIMARY KEY (`cityid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
