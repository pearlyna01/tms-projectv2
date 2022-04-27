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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` longtext NOT NULL,
  `email` varchar(100) NOT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (0,'admin','$argon2i$v=19$m=4096,t=3,p=1$sBKZTnGCmpawlmexCHmabA$jA1jeAsndnlXRoAEh0LSt8nHxw9ORzWiEpwnNeK1eu4','testemail@email.com',0),(6,'member2','$argon2i$v=19$m=4096,t=3,p=1$gVeb1jYb43oUUlKm+O+G/w$/ZMO4YDWgs2nq48rolndSJSiaOc9ijnKD9oWVG3oNls','f@email.com',0),(7,'member3','$argon2i$v=19$m=4096,t=3,p=1$Od3RXejpzrUl9+p9ZV0raQ$VqhZB6vGyC+1Z4SFx2XfadomF9ywYTwChnmRlTl2bjQ','test@email.com',1),(34,'test4','$argon2i$v=19$m=4096,t=3,p=1$Kx6mmrqUCjVyNX9U3TqkHA$fGWf4umM4uHGvLKlIfPiHaj6cYv1L/FL/WI65+yGlV0','email@email.o',0),(70,'test5','$argon2i$v=19$m=4096,t=3,p=1$4rP0LJ5TRrzouL/9QwzJMw$SSKOCKW2a0jWQ+ZCx1kOrXmzV4EAS8fb7pLC4EJDbeI','testemail@email.com',0),(76,'r','$argon2i$v=19$m=4096,t=3,p=1$l4r/vKcFxPOE5EMx5QFB3w$IXMccEUDRhwPnGt02/yxakBmdnIENLtzkRR7k7DGTVI','test@email.com',0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-27 17:13:56
