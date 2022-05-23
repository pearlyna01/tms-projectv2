-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: nodelogin
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `groupName` varchar(45) NOT NULL,
  `timeModified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'admin','Admin','2022-04-27 03:16:38',1),(2,'admin','Project Manager','2022-04-27 03:50:06',1),(4,'desc','Project Lead','2022-04-27 03:16:38',1),(5,'desc','Project Manager','2022-04-27 03:50:06',1),(6,'desc','Team Member','2022-04-27 03:16:38',1),(8,'member3','Project Lead','2022-04-27 03:16:38',1),(15,'member2','Admin','2022-04-27 06:25:53',1),(22,'member3','Admin','2022-04-27 07:46:46',1),(24,'member3','test','2022-04-27 07:58:54',1),(27,'desc','Admin','2022-04-28 06:07:55',1),(28,'desc','Project Lead','2022-04-28 07:15:42',0),(32,'admin','Project Manager','2022-04-28 07:33:36',0),(33,'test1','Team Member','2022-04-28 07:59:13',1),(34,'test1','Project Manager','2022-04-28 07:59:13',1),(35,'test4','Admin','2022-04-28 08:07:32',1),(39,'test1','Admin','2022-04-28 08:15:48',1),(40,'test1','Admin','2022-04-28 08:15:49',0),(41,'test4','Admin','2022-04-29 01:18:33',0),(43,'member2','Admin','2022-04-29 05:20:35',0),(44,'member2','Admin','2022-04-29 05:26:25',1),(47,'noRoles','Team Member','2022-04-29 06:35:55',1),(48,'noRoles','Team Member','2022-04-29 06:36:06',0),(49,'desc','Lead','2022-05-05 06:38:35',1),(50,'r','Lead','2022-05-09 06:45:59',1),(51,'admin','Project Manager','2022-05-17 03:49:24',1),(52,'admin','Team Member','2022-05-17 03:49:24',1),(53,'admin','Lead','2022-05-17 03:49:25',1),(54,'test4','Project Manager','2022-05-17 06:28:38',1),(55,'test4','Project Manager','2022-05-17 06:28:40',0),(56,'test4','Team Member','2022-05-17 06:28:45',1),(57,'noRoles','Project Manager','2022-05-19 08:19:31',1),(59,'PM','Project Manager','2022-05-20 00:37:10',1),(60,'TeamM','Team Member','2022-05-20 00:37:39',1),(61,'Lead','Lead','2022-05-20 09:00:00',1),(62,'Lead2','Lead','2022-05-20 05:51:52',1),(63,'r','Lead','2022-05-23 01:13:53',0),(64,'r','Lead','2022-05-23 01:14:27',0);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-23 17:43:11
