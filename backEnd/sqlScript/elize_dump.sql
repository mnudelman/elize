-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: elize
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `node_types`
--

DROP TABLE IF EXISTS `node_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `node_types` (
  `typeid` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) DEFAULT NULL,
  `comment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_types`
--

LOCK TABLES `node_types` WRITE;
/*!40000 ALTER TABLE `node_types` DISABLE KEYS */;
INSERT INTO `node_types` VALUES (1,'root','ÐºÐ¾Ñ€ÐµÐ½ÑŒ Ð´ÐµÑ€ÐµÐ²Ð° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°'),(2,'question','Ñ€Ð°Ð·Ð´ÐµÐ» Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° - Ð’ÐžÐŸÐ ÐžÐ¡'),(3,'subject','Ñ€Ð°Ð·Ð´ÐµÐ» Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° - Ð¡Ð£Ð‘ÐªÐ•ÐšÐ¢'),(4,'action','Ñ€Ð°Ð·Ð´ÐµÐ» Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° - Ð”Ð•Ð™Ð¡Ð¢Ð’Ð˜Ð•'),(5,'object','Ñ€Ð°Ð·Ð´ÐµÐ» Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° - ÐžÐ‘ÐªÐ•ÐšÐ¢'),(6,'sub_object','Ð¿Ð¾Ð´Ñ€Ð°Ð·Ð´ÐµÐ» Ñ€Ð°Ð·Ð´ÐµÐ»Ð° ÐžÐ‘ÐªÐ•ÐšÐ¢'),(7,'concept','Ð¿Ð¾Ð½ÑÑ‚Ð¸Ðµ'),(8,'synonym','ÑÐ»Ð¾Ð²Ð¾, Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÑÑŽÑ‰ÐµÐµ Ð¿Ð¾Ð½ÑÑ‚Ð¸Ðµ');
/*!40000 ALTER TABLE `node_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_tree`
--

DROP TABLE IF EXISTS `request_tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_tree` (
  `nodeid` int(11) NOT NULL AUTO_INCREMENT,
  `parentid` int(11) DEFAULT '0',
  `node_name` varchar(100) DEFAULT NULL,
  `typeid` int(11) DEFAULT NULL,
  `node_valid` int(11) DEFAULT '1',
  `node_default` int(11) DEFAULT '0',
  `comment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nodeid`),
  KEY `index_parent` (`parentid`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_tree`
--

LOCK TABLES `request_tree` WRITE;
/*!40000 ALTER TABLE `request_tree` DISABLE KEYS */;
INSERT INTO `request_tree` VALUES (1,0,'requestRoot',1,1,0,'ÐšÐžÐ Ð•ÐÐ¬ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°'),(2,1,'question',2,1,0,'Ð’ÐžÐŸÐ ÐžÐ¡ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°'),(3,1,'subject',3,1,0,'Ð¡Ð£Ð‘ÐªÐ•ÐšÐ¢ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°'),(4,1,'action',4,1,0,'Ð”Ð•Ð™Ð¡Ð¢Ð’Ð˜Ð• Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°'),(5,1,'object',5,1,0,'ÐžÐ‘ÐªÐ•ÐšÐ¢ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°'),(6,2,'where',7,1,0,'Ð²Ð¾Ð¿Ñ€Ð¾Ñ Ð“Ð”Ð•'),(7,2,'what',7,1,0,'Ð²Ð¾Ð¿Ñ€Ð¾Ñ Ð§Ð¢Ðž'),(8,2,'why',7,1,0,'Ð²Ð¾Ð¿Ñ€Ð¾Ñ ÐŸÐžÐ§Ð•ÐœÐ£'),(9,2,'when',7,1,0,'Ð²Ð¾Ð¿Ñ€Ð¾Ñ ÐšÐžÐ“Ð”Ð'),(13,3,'user',7,1,0,'ÐŸÐžÐ›Ð¬Ð—ÐžÐ’ÐÐ¢Ð•Ð›Ð¬ - ÑÑƒÐ±ÑŠÐµÐºÑ‚ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°'),(14,13,'Ñ…Ð¾Ñ‡Ñƒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ USER'),(15,13,'Ñ…Ð¾Ñ‚ÐµÐ»Ð¾ÑÑŒ Ð±Ñ‹',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼  USER'),(16,13,'Ð¿Ð¾ÐºÐ°Ð¶Ð¸Ñ‚Ðµ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼  USER'),(17,6,'Ð³Ð´Ðµ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHERE'),(18,6,'ÐºÑƒÐ´Ð°',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHER'),(19,6,'Ð¾Ñ‚ÐºÑƒÐ´Ð°',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHER'),(20,7,'Ñ‡Ñ‚Ð¾',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHAT'),(21,7,'ÐºÐ°ÐºÐ¾Ð¹',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHAT '),(22,7,'ÐºÐ°ÐºÐ¾Ð²',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHAT'),(23,7,'ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ð¹',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHAT'),(24,8,'Ð¿Ð¾Ñ‡ÐµÐ¼Ñƒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHY'),(25,8,'Ð·Ð°Ñ‡ÐµÐ¼',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHY'),(26,8,'ÐºÐ°Ðº',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHY'),(27,9,'ÐºÐ¾Ð³Ð´Ð°',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHEN'),(28,9,'ÑƒÐºÐ°Ð¶Ð¸Ñ‚Ðµ Ð´Ð°Ñ‚Ñƒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ WHEN'),(29,4,'buy',7,1,0,'Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ðµ ÐšÐ£ÐŸÐ˜Ð¢Ð¬'),(30,4,'look',7,1,0,'Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ðµ ÐŸÐ ÐžÐ¡ÐœÐžÐ¢Ð Ð•Ð¢Ð¬ '),(31,4,'order',7,1,0,'Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ðµ Ð—ÐÐšÐÐ—ÐÐ¢Ð¬'),(32,29,'ÐºÑƒÐ¿Ð¸Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ BUY'),(33,29,'Ð¿Ñ€Ð¸Ð¾Ð±Ñ€ÐµÑÑ‚Ð¸',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ BUY'),(34,29,'Ð¿Ð¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ BUY'),(35,30,'ÑƒÐ·Ð½Ð°Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(36,30,'Ð¿Ð¾ÑÐ¼Ð¾Ñ‚Ñ€ÐµÑ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(37,30,'Ð¿Ð¾ÐºÐ°Ð¶Ð¸Ñ‚Ðµ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(38,31,'Ð·Ð°ÐºÐ°Ð·Ð°Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ ORDER'),(39,31,'Ð·Ð°ÐºÐ°Ð·Ñ‹Ð²Ð°Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(40,31,'ÑÐ´ÐµÐ»Ð°Ñ‚ÑŒ Ð·Ð°ÐºÐ°Ð·',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(41,29,'ÐºÑƒÐ¿Ð¸Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ BUY'),(42,29,'Ð¿Ñ€Ð¸Ð¾Ð±Ñ€ÐµÑÑ‚Ð¸',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ BUY'),(43,29,'Ð¿Ð¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ BUY'),(44,30,'ÑƒÐ·Ð½Ð°Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(45,30,'Ð¿Ð¾ÑÐ¼Ð¾Ñ‚Ñ€ÐµÑ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(46,30,'Ð¿Ð¾ÐºÐ°Ð¶Ð¸Ñ‚Ðµ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(47,31,'Ð·Ð°ÐºÐ°Ð·Ð°Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ ORDER'),(48,31,'Ð·Ð°ÐºÐ°Ð·Ñ‹Ð²Ð°Ñ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(49,31,'ÑÐ´ÐµÐ»Ð°Ñ‚ÑŒ Ð·Ð°ÐºÐ°Ð·',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ LOOK'),(50,5,'price',7,1,0,'Ð¦Ð•ÐÐ'),(51,5,'repairman',7,1,0,'ÐœÐÐ¡Ð¢Ð•Ð '),(52,5,'product',6,1,0,'Ð¿Ð¾Ð´-Ð¾Ð±ÑŠÐµÐºÑ‚ ÐŸÐ ÐžÐ”Ð£ÐšÐ¢, Ð˜Ð—Ð”Ð•Ð›Ð˜Ð•'),(53,5,'service',6,1,0,'Ð¿Ð¾Ð´-Ð¾Ð±ÑŠÐµÐºÑ‚ Ð£Ð¡Ð›Ð£Ð“Ð˜'),(67,50,'Ñ†ÐµÐ½Ð°',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(68,50,'Ñ†ÐµÐ½Ñ‹',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(69,50,'Ñ†ÐµÐ½Ð°Ð¼Ð¸',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(70,50,'Ð¿Ð¾ Ñ†ÐµÐ½Ðµ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(71,50,'Ð¿Ð¾ ÐºÐ°ÐºÐ¾Ð¹ Ñ†ÐµÐ½Ðµ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(72,50,'ÑÐºÐ¾Ð»ÑŒÐºÐ¾ ÑÑ‚Ð¾Ð¸Ñ‚',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(73,50,'ÑÑ‚Ð¾Ð¸Ð¼Ð¾ÑÑ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(74,51,'Ð¼Ð°ÑÑ‚ÐµÑ€ Ð¿Ð¾ Ñ€ÐµÐ¼Ð¾Ð½Ñ‚Ñƒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ REPAIRMAN'),(75,51,'ÑÐ¿ÐµÑ†Ð¸Ð°Ð»Ð¸ÑÑ‚ Ð¿Ð¾ Ñ€ÐµÐ¼Ð½Ñ‚Ñƒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ REPAIRMAN'),(76,51,'ÑÐ»ÐµÐºÑ€Ð¸Ðº',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ REPAIRMAN'),(77,51,'ÑÐ°Ð½Ñ‚ÐµÑ…Ð½Ð¸Ðº',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ REPAIRMAN'),(78,50,'Ñ†ÐµÐ½Ð°',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(79,50,'Ñ†ÐµÐ½Ñ‹',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(80,50,'Ñ†ÐµÐ½Ð°Ð¼Ð¸',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(81,50,'Ð¿Ð¾ Ñ†ÐµÐ½Ðµ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(82,50,'Ð¿Ð¾ ÐºÐ°ÐºÐ¾Ð¹ Ñ†ÐµÐ½Ðµ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(83,50,'ÑÐºÐ¾Ð»ÑŒÐºÐ¾ ÑÑ‚Ð¾Ð¸Ñ‚',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(84,50,'ÑÑ‚Ð¾Ð¸Ð¼Ð¾ÑÑ‚ÑŒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ PRICE'),(85,51,'Ð¼Ð°ÑÑ‚ÐµÑ€ Ð¿Ð¾ Ñ€ÐµÐ¼Ð¾Ð½Ñ‚Ñƒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ REPAIRMAN'),(86,51,'ÑÐ¿ÐµÑ†Ð¸Ð°Ð»Ð¸ÑÑ‚ Ð¿Ð¾ Ñ€ÐµÐ¼Ð½Ñ‚Ñƒ',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ REPAIRMAN'),(87,51,'ÑÐ»ÐµÐºÑ€Ð¸Ðº',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ REPAIRMAN'),(88,51,'ÑÐ°Ð½Ñ‚ÐµÑ…Ð½Ð¸Ðº',8,1,0,'ÑÐ¸Ð½Ð¾Ð½Ð¸Ð¼ REPAIRMAN'),(89,5,'place',6,1,0,'Ð¿Ð¾Ð´-Ð¾Ð±ÑŠÐµÐºÑ‚ ÐœÐ•Ð¡Ð¢Ðž(Ð³Ð¾Ñ€Ð¾Ð´, Ñ€Ð°Ð¹Ð¾Ð½,.....)'),(90,52,'fridge',7,1,0,'Ð¥ÐžÐ›ÐžÐ”Ð˜Ð›Ð¬ÐÐ˜Ðš'),(91,52,'computer',7,1,0,'ÐšÐžÐœÐŸÐ¬Ð®Ð¢Ð•Ð '),(92,52,'washer',7,1,0,'Ð¡Ð¢Ð˜Ð ÐÐ›Ð¬ÐÐÐ¯ ÐœÐÐ¨Ð˜ÐÐ');
/*!40000 ALTER TABLE `request_tree` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-11 11:50:35
