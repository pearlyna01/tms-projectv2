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
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `App_Acronym` varchar(20) NOT NULL,
  `App_Description` varchar(150) DEFAULT NULL,
  `App_Rnumber` int NOT NULL DEFAULT '0',
  `App_startDate` date DEFAULT NULL,
  `App_endDate` date DEFAULT NULL,
  `App_permit_Open` varchar(45) DEFAULT NULL,
  `App_permit_toDoList` varchar(45) DEFAULT NULL,
  `App_permit_Doing` varchar(45) DEFAULT NULL,
  `App_permit_Done` varchar(45) DEFAULT NULL,
  `App_permit_Close` varchar(45) DEFAULT NULL,
  `App_permit_Create` varchar(45) DEFAULT NULL,
  `Audit` longtext,
  PRIMARY KEY (`App_Acronym`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES ('ACRO2','test value',10,'2003-04-23','2003-04-06','Lead','Project Manager','Team Member','Team Member','Lead','Lead',NULL),('ACRO3','test value',12,'2003-04-23','2003-04-06','Lead','Project Manager','Team Member','Team Member','Lead','Lead',NULL),('APP0','sdfsdfsdf',0,'2022-05-05','2022-05-05','Lead','Project Manager','Team Member','Team Member','Lead','Lead',NULL),('APP4','something',1,'2022-05-12','2022-05-12','Lead','Project Manager','Team Member','Team Member','Lead','Lead',NULL),('GRPS','testing each group ',3,'2022-05-17','2022-05-17','Lead','Project Manager','Team Member','Team Member','Lead','Lead',NULL),('TWST','oiugog u',0,'2022-05-09','2022-05-09','Lead','Project Manager','Team Member','Team Member','Lead','Lead',NULL);
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-17 17:48:07
