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
INSERT INTO `application` VALUES ('AP2','asdadssd',6,'2022-05-20','2022-05-20','Project Manager','Team Member','Team Member','Lead','Lead','Application AP2 is updated on Fri May 20 2022\nApp_permit_Done updated from Team Member to Lead\n-------------\nApplication AP2 is created on Fri May 20 2022'),('APP','just an app',1,'2022-05-24','2022-05-18','Project Manager','Team Member','Team Member','Lead','Lead','Application APP is updated on Mon May 23 2022\nApp_permit_Done updated from Team Member to Lead\nApp_permit_Create updated from Lead to undefined\n-------------\nApplication APP is updated on Fri May 20 2022\n-------------\nApplication APP is created on Fri May 20 2022'),('APP4','something',1,'2022-05-12','2022-05-12','Project Manager','Team Member','Team Member','Lead','Lead','Application APP4 is updated on Thu May 19 2022\nApp_permit_Open updated from Lead to Project Manager\n-------------\nApplication APP4 is updated on Thu May 19 2022\n-------------\nApplication APP4 is updated on Thu May 19 2022\nApp_permit_Open updated from Admin to Lead\n-------------\nApplication APP4 is updated on Thu May 19 2022\nApp_permit_Open updated from Lead to Admin\n-------------\nApp created'),('BANANA','this is a banana',4,'2022-05-23','2022-05-23','Project Manager','Team Member','Team Member','Lead','Lead','Application BANANA is created on Mon May 23 2022'),('GRPS','testing each group ',51,'2022-05-17','2022-05-17','Project Manager','Team Member','Team Member','Lead','Lead','Application GRPS is updated on Mon May 23 2022\n-------------\nApplication GRPS is updated on Mon May 23 2022\nApp_permit_Done updated from Team Member to Lead\n-------------\nApplication GRPS is updated on Mon May 23 2022\nApp_permit_Done updated from Team Member to Lead\n-------------\nApplication GRPS is updated on Fri May 20 2022\nApp_permit_Open updated from Team Member to Project Manager\nApp_permit_toDoList updated from Project Manager to Team Member\nApp_permit_Create updated from Team Member to Lead\n-------------\nApplication GRPS is updated on Thu May 19 2022\nApp_permit_Open updated from Admin to Team Member\n-------------\nApp created'),('TEST','Testing PM role',4,'2022-05-23','2022-05-23','Project Manager','Team Member','Team Member','Lead','Lead','Application TEST is updated on Mon May 23 2022\nApp_permit_Open updated from Team Member to Project Manager\n-------------\nApplication TEST is updated on Mon May 23 2022\nApp_permit_Open updated from Project Manager to Team Member\n-------------\nApplication TEST is created on Mon May 23 2022');
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

-- Dump completed on 2022-08-15  9:49:59
