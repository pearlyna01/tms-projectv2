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
INSERT INTO `task` VALUES ('test1','testing only','--------------\nUser: admin\nStatus: close\nTimestamp: Thu May 12 2022 16:34:43 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:34:35 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:34:35 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:34:33 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:32:52 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:16:58 GMT+0800 (Singapore Standard Time)\n--------------\nUser: undefined\nStatus: open\nTimestamp: Fri May 06 2022 14:14:21 GMT+0800 (Singapore Standard Time)\n','ACRO3_0','test','ACRO3','close','member3','member3','2022-05-06'),('task1','test','--------------\nUser: admin\nStatus: close\nTimestamp: Thu May 12 2022 17:10:57 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 17:10:00 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 17:07:27 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 17:07:23 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:55:38 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:49:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:37:51 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:17:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Fri May 06 2022 14:15:27 GMT+0800 (Singapore Standard Time)\n','ACRO3_1','test2','ACRO3','close','admin','admin','2022-05-06'),('  test','djksdjskdfhskdf','--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 19 2022 17:19:20 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 13:32:12 GMT+0800 (Singapore Standard Time)\n--------------\nUser: r\nStatus: open\nTimestamp: Tue May 17 2022 13:27:56 GMT+0800 (Singapore Standard Time)\n','ACRO3_10','','ACRO3','doing','r','admin','2022-05-17'),('test create task','l fdl fdbml fbdlk mfbdlk fbdkl ','--------------\nUser: test4\nStatus: to-do\nTimestamp: Tue May 17 2022 14:29:56 GMT+0800 (Singapore Standard Time)\n--------------\nUser: undefined\nStatus: open\nTimestamp: Tue May 17 2022 13:35:55 GMT+0800 (Singapore Standard Time)\n','ACRO3_11','','ACRO3','to_do','admin','test4','2022-05-17'),('testTEAT','oiwuahoc weihcpweu hfaoviweufg pIWH EA','--------------\nUser: admin\nStatus: close\nTimestamp: Thu May 12 2022 17:07:32 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 17:01:59 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:54:36 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:54:28 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:53:00 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:52:52 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:52:06 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:37:57 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Thu May 12 2022 16:37:37 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 16:35:04 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:18:16 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Tue May 10 2022 14:36:49 GMT+0800 (Singapore Standard Time)\n','ACRO3_4','','ACRO3','close','admin','admin','2022-05-10'),('test Task','surhg i uhrgpaowh egp higpGU','--------------\nUser: admin\nStatus: close\nTimestamp: Tue May 17 2022 10:31:34 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Tue May 17 2022 10:31:30 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 10:15:44 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 09:55:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Tue May 10 2022 14:39:05 GMT+0800 (Singapore Standard Time)\n','ACRO3_6','','ACRO3','close','admin','admin','2022-05-10'),('A TASK','rgkljb gjrghlwejkg','--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 10:33:16 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 10:16:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 10:04:32 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 10:04:00 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 09:56:49 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 09:55:54 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Tue May 10 2022 16:17:22 GMT+0800 (Singapore Standard Time)\n','ACRO3_7','MVP_4','ACRO3','doing','admin','admin','2022-05-10'),('fix bugs','fix a bug in the system','--------------\nUser: admin\nStatus: doing\nTimestamp: Wed May 18 2022 09:06:03 GMT+0800 (Singapore Standard Time)\n--------------\nUser: test4\nStatus: to-do\nTimestamp: Tue May 17 2022 14:29:47 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 13:37:40 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 10:17:14 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 10:17:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 10:16:53 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 10:15:06 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 10:13:55 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 10:12:29 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 10:11:50 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 10:11:05 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 10:10:27 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 10:10:15 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 10:08:39 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 09:54:35 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Tue May 17 2022 09:53:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 09:52:23 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Tue May 17 2022 08:42:01 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 08:41:54 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Tue May 17 2022 08:41:21 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Tue May 17 2022 08:41:20 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 17:13:06 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 17:09:02 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Thu May 12 2022 17:07:10 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 16:21:38 GMT+0800 (Singapore Standard Time)\n--------------\nUser: r\nStatus: open\nTimestamp: Wed May 11 2022 10:15:36 GMT+0800 (Singapore Standard Time)\n','ACRO3_8','','ACRO3','doing','r','admin','2022-05-11'),('Work on perms','need to reformat all the perms','--------------\nUser: admin\nStatus: close\nTimestamp: Tue May 17 2022 13:20:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: done\nTimestamp: Tue May 17 2022 13:20:13 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 13:20:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 13:20:04 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: doing\nTimestamp: Tue May 17 2022 13:19:58 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: to-do\nTimestamp: Tue May 17 2022 13:19:51 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Tue May 17 2022 11:50:06 GMT+0800 (Singapore Standard Time)\n','ACRO3_9','','ACRO3','close','admin','admin','2022-05-17'),('task1','asdasdasddd','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 17:14:02 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:12:50 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:12:42 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:12:28 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:12:21 GMT+0800 (Singapore Standard Time)\n--------------\nUser PM added a note.\nasdsd\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:11:58 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:11:37 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: asdasdasddd\nPlan: release1\nComments: somethig\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:11:24 GMT+0800 (Singapore Standard Time)\nComments: someting\n','AP2_0','release1','AP2','close','Lead','Lead','2022-05-20'),('test1','testtddd','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 17:51:59 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:51:47 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: doing\nTimestamp: Fri May 20 2022 17:51:19 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:51:00 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:47:30 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:47:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:46:58 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:46:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:46:45 GMT+0800 (Singapore Standard Time)\n--------------\nUser PM added a note.\nApproved\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:46:24 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:46:05 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: testtddd\nPlan: \nComments: PM pls approve\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:45:48 GMT+0800 (Singapore Standard Time)\nComments: testste\n','AP2_1','','AP2','close','Lead','Lead','2022-05-20'),('sdfsdfsdf','asdasdaf','--------------\nUser: admin\nStatus: to-do\nTimestamp: Thu May 12 2022 17:16:52 GMT+0800 (Singapore Standard Time)\n--------------\nUser: admin\nStatus: open\nTimestamp: Thu May 12 2022 17:16:48 GMT+0800 (Singapore Standard Time)\n','APP4_0','','APP4','to_do','admin','admin','2022-05-12'),('Task','desc\nsdsd','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 12:59:18 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 12:58:59 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 12:58:56 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 12:58:45 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 12:58:40 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 12:58:19 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 12:58:16 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 12:58:16 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 12:58:11 GMT+0800 (Singapore Standard Time)\n--------------\nUser PM added a note.\nApproved\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 12:57:50 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 12:54:47 GMT+0800 (Singapore Standard Time)\nComments: asdasd\n','APPLE_0','','APPLE','close','Lead','Lead','2022-05-20'),('Task','desc\nsdsd\nasas','--------------\nUser PM added a note.\nAdding comment\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 14:07:50 GMT+0800 (Singapore Standard Time)\n--------------\nUser TeamM added a note.\nadding\n--------------\nUser TeamM added a note.\nADD NOTE\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:45:04 GMT+0800 (Singapore Standard Time)\n--------------\nUser TeamM added a note.\ntesting\n--------------\nUser TeamM added a note.\ntest\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:24:42 GMT+0800 (Singapore Standard Time)\n--------------\nUser TeamM added a note.\ntesting\n--------------\nUser TeamM added a note.\ntest\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:16:23 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:09:27 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 13:05:51 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:05:45 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:05:27 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:04:19 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:04:11 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:04:02 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:03:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:03:22 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:02:32 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 12:59:57 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 12:59:45 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 12:57:19 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: desc\nsdsd\nasas\nPlan: \nComments: \n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 12:54:47 GMT+0800 (Singapore Standard Time)\nComments: asdasd\n','APPLE_1','','APPLE','doing','Lead','TeamM','2022-05-20'),('a task','a task desc\nsc','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 14:08:35 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 13:53:04 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:46:54 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 13:46:05 GMT+0800 (Singapore Standard Time)\n--------------\nUser TeamM added a note.\ntest\n--------------\nUser TeamM added a note.\nadd comment\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:13:20 GMT+0800 (Singapore Standard Time)\n--------------\nUser PM added a note.\nnew comment\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:10:28 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 12:55:34 GMT+0800 (Singapore Standard Time)\nComments: asdasdasd\n','APPLE_2','','APPLE','close','Lead','Lead','2022-05-20'),('tasky','','--------------\nUser TeamM added a note.\ntesting\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 14:08:01 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:53:16 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 13:53:10 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:53:05 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:50:49 GMT+0800 (Singapore Standard Time)\n--------------\nUser TeamM added a note.\nTEST\n\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 13:14:51 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 13:12:17 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 12:56:45 GMT+0800 (Singapore Standard Time)\nComments: \n','APPLE_3','','APPLE','to_do','Lead','TeamM','2022-05-20'),('TEST task','something','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 17:02:10 GMT+0800 (Singapore Standard Time)\n--------------\nUser Lead added a note.\nDone SIR\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:01:44 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:01:37 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:01:30 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:01:25 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 17:01:23 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 17:01:18 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 17:01:04 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:00:49 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: something\nPlan: MVP1\nComments: somehthing\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 17:00:29 GMT+0800 (Singapore Standard Time)\nComments: something something\n','APP_0','MVP1','APP','close','Lead','Lead','2022-05-20'),('TEST','new desc','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 11:10:36 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 11:08:02 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 11:07:54 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 11:07:49 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 11:07:41 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: to-do\nTimestamp: Fri May 20 2022 11:07:34 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 11:07:32 GMT+0800 (Singapore Standard Time)\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 11:06:37 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 11:00:47 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: new desc\nPlan: plan2\nComments: asdasdasd\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 10:44:21 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: new desc\nPlan: plan2\nComments: testing new comment\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 10:32:30 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: testingasdasd\nPlan: \nComments: asdasdasdasd\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 10:01:51 GMT+0800 (Singapore Standard Time)\nComments: first task\n','GRPS_20','plan2','GRPS','close','Lead','Lead','2022-05-20'),('asda','asasd','--------------\nUser: Lead\nStatus: close\nTimestamp: Fri May 20 2022 11:48:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: done\nTimestamp: Fri May 20 2022 11:48:07 GMT+0800 (Singapore Standard Time)\n--------------\nUser: TeamM\nStatus: doing\nTimestamp: Fri May 20 2022 11:48:03 GMT+0800 (Singapore Standard Time)\n--------------\nUser Lead added a note.\nADdding a note\n--------------\nUser Lead added a note.\nAdd comment\n--------------\nUser Lead added a note.\nTask comment\nUser Lead added a note.\nnote from Lead\n--------------\n--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 11:12:35 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 11:12:24 GMT+0800 (Singapore Standard Time)\nComments: asd\n','GRPS_21','','GRPS','close','Lead','Lead','2022-05-20'),('New task','asdasd','--------------\nUser: PM\nStatus: to-do\nTimestamp: Fri May 20 2022 11:52:48 GMT+0800 (Singapore Standard Time)\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 11:47:08 GMT+0800 (Singapore Standard Time)\n>>>New changes to task>>>\nDescription: asdasd\nPlan: \nComments: Add comment\n--------------\nUser: Lead\nStatus: open\nTimestamp: Fri May 20 2022 11:14:13 GMT+0800 (Singapore Standard Time)\nComments: asdasd\n','GRPS_22','','GRPS','to_do','Lead','PM','2022-05-20');
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

-- Dump completed on 2022-05-20 17:55:49
