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
INSERT INTO `task` VALUES ('task1','asdasdasddd','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 17:14:02 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:12:50 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:12:42 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:12:28 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:12:21 GMT+0800 (Singapore Standard Time)\n--------------\nUser PM added a note.\nasdsd\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:11:58 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:11:37 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: asdasdasddd\nPlan: release1\nComments: somethig\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:11:24 GMT+0800 (Singapore Standard Time)\nComments: someting\n','AP2_0','release1','AP2','close','Lead','Lead','2022-05-20'),('test1','testtddd','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 17:51:59 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:51:47 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: doing\nTimestamp: Fri May 20 2022 17:51:19 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:51:00 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:47:30 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:47:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:46:58 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:46:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:46:45 GMT+0800 (Singapore Standard Time)\n--------------\nUser PM added a note.\nApproved\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:46:24 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:46:05 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: testtddd\nPlan: \nComments: PM pls approve\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:45:48 GMT+0800 (Singapore Standard Time)\nComments: testste\n','AP2_1','','AP2','close','Lead','Lead','2022-05-20'),('create task','just create task. edit task.','--------------\nUser: Lead\nStatus: close\nTimestamp: Mon May 23 2022 08:48:11 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 08:46:40 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 08:46:32 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Mon May 23 2022 08:46:26 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 08:46:23 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Mon May 23 2022 08:46:03 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 08:45:44 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: just create task. edit task.\nPlan: \nComments: edit task comment\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 08:43:29 GMT+0800 (Singapore Standard Time)\nComments: just a comment\n','AP2_2','','AP2','close','Lead','Lead','2022-05-23'),('task2','another task','--------------\nUser: Lead\nStatus: doing\nTimestamp: Mon May 23 2022 08:50:39 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 08:50:14 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 08:50:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Mon May 23 2022 08:49:53 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 08:49:41 GMT+0800 (Singapore Standard Time)\nComments: \n','AP2_3','','AP2','doing','Lead','Lead','2022-05-23'),('sdfsdfsdf','asdasdaf','--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 17:16:52 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Thu May 12 2022 17:16:48 GMT+0800 (Singapore Standard Time)\n','APP4_0','','APP4','to_do','admin','admin','2022-05-12'),('TEST task','something','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 17:02:10 GMT+0800 (Singapore Standard Time)\n--------------\nUser Lead added a note.\nDone SIR\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:01:44 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:01:37 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:01:30 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:01:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:01:23 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:01:18 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:01:04 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:00:49 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: something\nPlan: MVP1\nComments: somehthing\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:00:29 GMT+0800 (Singapore Standard Time)\nComments: something something\n','APP_0','MVP1','APP','close','Lead','Lead','2022-05-20'),('task1','this is a task','--------------\nUser: Lead\nStatus: close\nTimestamp: Mon May 23 2022 17:37:20 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 17:24:27 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 17:23:34 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Mon May 23 2022 17:23:26 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 17:23:20 GMT+0800 (Singapore Standard Time)\n--------------\nUser PM added a note.\nI approve\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Mon May 23 2022 17:22:37 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 17:21:58 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: this is a task\nPlan: \nComments: this is additional note\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 17:21:33 GMT+0800 (Singapore Standard Time)\nComments: this is a new note\nthis is a 2nd note\n','BANANA_0','','BANANA','close','Lead','Lead','2022-05-23'),('task2','asdasdasd','--------------\nUser: Lead\nStatus: close\nTimestamp: Mon May 23 2022 17:39:03 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 17:38:50 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 17:38:37 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Mon May 23 2022 17:38:24 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 17:38:14 GMT+0800 (Singapore Standard Time)\nComments: as\n','BANANA_1','','BANANA','close','Lead','Lead','2022-05-23'),('TEST','new desc','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 11:10:36 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 11:08:02 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 11:07:54 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 11:07:49 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 11:07:41 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 11:07:34 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 11:07:32 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 11:06:37 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 11:00:47 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: new desc\nPlan: plan2\nComments: asdasdasd\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 10:44:21 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: new desc\nPlan: plan2\nComments: testing new comment\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 10:32:30 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: testingasdasd\nPlan: \nComments: asdasdasdasd\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 10:01:51 GMT+0800 (Singapore Standard Time)\nComments: first task\n','GRPS_20','plan2','GRPS','close','Lead','Lead','2022-05-20'),('asda','asasd','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 11:48:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 11:48:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 11:48:03 GMT+0800 (Singapore Standard Time)\n--------------\nUser Lead added a note.\nADdding a note\n--------------\nUser Lead added a note.\nAdd comment\n--------------\nUser Lead added a note.\nTask comment\nUser Lead added a note.\nnote from Lead\n--------------\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 11:12:35 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 11:12:24 GMT+0800 (Singapore Standard Time)\nComments: asd\n','GRPS_21','','GRPS','close','Lead','Lead','2022-05-20'),('New task','asdasd','--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 13:32:47 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: doing\nTimestamp: Mon May 23 2022 13:05:11 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 09:56:24 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 09:55:55 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Mon May 23 2022 09:51:12 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 09:51:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 11:52:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 11:47:08 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: asdasd\nPlan: \nComments: Add comment\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 11:14:13 GMT+0800 (Singapore Standard Time)\nComments: asdasd\n','GRPS_22','','GRPS','done','Lead','TeamM','2022-05-20'),('Test EMAIL','test email sending','--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Mon May 23 2022 13:09:54 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 13:09:50 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Mon May 23 2022 13:06:55 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: doing\nTimestamp: Mon May 23 2022 13:06:00 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 09:52:01 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 09:51:59 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 09:51:09 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Mon May 23 2022 09:50:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 09:50:19 GMT+0800 (Singapore Standard Time)\nComments: \n','GRPS_23','','GRPS','to_do','Lead','TeamM','2022-05-23'),('Test Email2','esefsdfsdf','--------------\nUser: Lead\nStatus: doing\nTimestamp: Mon May 23 2022 13:05:13 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 09:52:58 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 09:51:11 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Mon May 23 2022 09:50:51 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 09:50:33 GMT+0800 (Singapore Standard Time)\nComments: \n','GRPS_24','','GRPS','doing','Lead','Lead','2022-05-23'),('Task111','sdfsdf','--------------\nUser: PM\nStatus: to-do\nTimestamp: Mon May 23 2022 13:06:39 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 13:05:32 GMT+0800 (Singapore Standard Time)\nComments: new comment\n','GRPS_25','','GRPS','to_do','Lead','PM','2022-05-23'),('Testing','sdfsdfs','--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 13:06:16 GMT+0800 (Singapore Standard Time)\nComments: sdf\n','GRPS_26','plan2','GRPS','open','Lead','Lead','2022-05-23'),('Test Lead doing','sdfsdfsdf','--------------\nUser: Lead\nStatus: doing\nTimestamp: Mon May 23 2022 14:52:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 14:51:57 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 12:55:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Mon May 23 2022 12:55:45 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: doing\nTimestamp: Mon May 23 2022 12:51:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Mon May 23 2022 12:50:03 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Mon May 23 2022 12:49:51 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Mon May 23 2022 12:47:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 12:46:47 GMT+0800 (Singapore Standard Time)\nComments: \n','TEST_2','','TEST','doing','Lead','Lead','2022-05-23'),('Test Team Member','sdfsdfsdf','--------------\nUser: Lead\nStatus: open\nTimestamp: Mon May 23 2022 12:47:06 GMT+0800 (Singapore Standard Time)\nComments: \n','TEST_3','','TEST','open','Lead','Lead','2022-05-23');
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

-- Dump completed on 2022-05-23 17:43:11
