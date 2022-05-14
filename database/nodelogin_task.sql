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
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `Task_name` varchar(50) DEFAULT NULL,
  `Task_description` varchar(150) DEFAULT NULL,
  `Task_notes` longtext,
  `Task_id` varchar(100) NOT NULL,
  `Task_plan` varchar(20) DEFAULT NULL,
  `Task_app_Acronym` varchar(20) DEFAULT NULL,
  `Task_state` enum('open','to_do','doing','done','close') DEFAULT 'open',
  `Task_creator` varchar(30) DEFAULT NULL,
  `Task_owner` varchar(30) DEFAULT NULL,
  `Task_createDate` date DEFAULT (curdate()),
  PRIMARY KEY (`Task_id`),
  KEY `Task_app_Acronym` (`Task_app_Acronym`) /*!80000 INVISIBLE */,
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`Task_app_Acronym`) REFERENCES `application` (`App_Acronym`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES ('task2','task desciption here','--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 05 2022 12:10:01 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nDate: Wed, 04 May 2022 09:37:52 GMT\n--------------\nUser: admin\nStatus: to-do\nDate: Wed, 04 May 2022 09:25:57 GMT\n--------------\nUser: admin\nStatus: to-do\nDate: Wed, 04 May 2022 09:10:41 GMT\n--------------\nUser: admin\nStatus: open\nDate: Wed, 04 May 2022 09:09:10 GMT\n','ACRO2_6','test','ACRO2','done','admin','admin','2022-05-04'),('task2','task desciption here','--------------\nUser: admin\nStatus: open\nTimestamp: Mon May 09 2022 14:44:04 GMT+0800 (Singapore Standard Time)\n','ACRO2_7','test','ACRO2','open','admin','admin','2022-05-09'),('task2','task desciption here','--------------\nUser: r\nStatus: open\nTimestamp: Mon May 09 2022 14:48:41 GMT+0800 (Singapore Standard Time)\n','ACRO2_8','test','ACRO2','open','member2','member2','2022-05-09'),('test plan','something','--------------\nUser: admin\nStatus: open\nTimestamp: Thu May 12 2022 10:16:25 GMT+0800 (Singapore Standard Time)\n','ACRO2_9','','ACRO2','open','admin','admin','2022-05-12'),('test1','testing only','--------------\nUser: admin\nStatus: close\nTimestamp: Thu May 12 2022 16:34:43 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:34:35 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:34:35 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:34:33 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:32:52 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:16:58 GMT+0800 (Singapore Standard Time)\n--------------\nUser: undefined\nStatus: open\nTimestamp: Fri May 06 2022 14:14:21 GMT+0800 (Singapore Standard Time)\n','ACRO3_0','test','ACRO3','close','member3','member3','2022-05-06'),('task1','test','--------------\nUser: admin\nStatus: close\nTimestamp: Thu May 12 2022 17:10:57 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 17:10:00 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 17:07:27 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 17:07:23 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:55:38 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:49:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:37:51 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:17:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Fri May 06 2022 14:15:27 GMT+0800 (Singapore Standard Time)\n','ACRO3_1','test2','ACRO3','close','admin','admin','2022-05-06'),('testTEAT','oiwuahoc weihcpweu hfaoviweufg pIWH EA','--------------\nUser: admin\nStatus: close\nTimestamp: Thu May 12 2022 17:07:32 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 17:01:59 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:54:36 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:54:28 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:53:00 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:52:52 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:52:06 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:37:57 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:37:37 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:35:04 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:18:16 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Tue May 10 2022 14:36:49 GMT+0800 (Singapore Standard Time)\n','ACRO3_4','','ACRO3','close','admin','admin','2022-05-10'),('test Task','surhg i uhrgpaowh egp higpGU','--------------\nUser: admin\nStatus: open\nTimestamp: Tue May 10 2022 14:39:05 GMT+0800 (Singapore Standard Time)\n','ACRO3_6','','ACRO3','open','admin','admin','2022-05-10'),('A TASK','rgkljb gjrghlwejkg','--------------\nUser: admin\nStatus: open\nTimestamp: Tue May 10 2022 16:17:22 GMT+0800 (Singapore Standard Time)\n','ACRO3_7','MVP_4','ACRO3','open','admin','admin','2022-05-10'),('fix bugs','fix a bug in the system','--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 17:13:06 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 17:09:02 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 17:07:10 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:21:38 GMT+0800 (Singapore Standard Time)\n--------------\nUser: r\nStatus: open\nTimestamp: Wed May 11 2022 10:15:36 GMT+0800 (Singapore Standard Time)\n','ACRO3_8','','ACRO3','doing','r','r','2022-05-11'),('sdfsdfsdf','asdasdaf','--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 17:16:52 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Thu May 12 2022 17:16:48 GMT+0800 (Singapore Standard Time)\n','APP4_0','','APP4','to_do','admin','admin','2022-05-12');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-14 12:18:25
