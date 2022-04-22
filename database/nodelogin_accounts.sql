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
  `group_name` varchar(100) DEFAULT 'no_group',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (0,'admin','$argon2i$v=19$m=4096,t=3,p=1$ArfHtKmtNy5jZC+157PmEg$DM7V1gJBnoKbYQMTGquCynGa8Ua9x4h+DRx297lraPE','dfsdf@email.com',0,''),(6,'member2','$argon2i$v=19$m=4096,t=3,p=1$gVeb1jYb43oUUlKm+O+G/w$/ZMO4YDWgs2nq48rolndSJSiaOc9ijnKD9oWVG3oNls','f@email.com',0,''),(7,'member3','$argon2i$v=19$m=4096,t=3,p=1$Od3RXejpzrUl9+p9ZV0raQ$VqhZB6vGyC+1Z4SFx2XfadomF9ywYTwChnmRlTl2bjQ','test@email.com',0,'TM,L'),(8,'lead1','$argon2i$v=19$m=4096,t=3,p=1$OjB14HlmDPbIYGzlNh4jZQ$okLVIhmsPHNyySWl2yzucRHimVG4kByeK8Gzw9HW/VI','email@email.o',0,'L,PM'),(19,'test','$argon2i$v=19$m=4096,t=3,p=1$BGJTTKrRmovwomKO+lP4lA$5M3p96NcLU9JiftBgwx0dSsJmGFx3gHgeqX6F1RB8sg','test@email.com',0,'no_group'),(34,'test4','$argon2i$v=19$m=4096,t=3,p=1$Kx6mmrqUCjVyNX9U3TqkHA$fGWf4umM4uHGvLKlIfPiHaj6cYv1L/FL/WI65+yGlV0','email@email.o',0,'no_group'),(35,'test2','$argon2i$v=19$m=4096,t=3,p=1$rCT1CTDVdXl+hwm07rxQug$2n0LRKgXi4TK9clJJbluqr01bKJov3w61f6UzCQ3xbQ','email@email.o',0,'no_group'),(37,'test5','$argon2i$v=19$m=4096,t=3,p=1$zYTiXmcx/Ys6yGZA3ssNvw$DNB+nsZeQi8ojC/f3upKxzxYa3MrQ90EMDd2EDCTHbg','email@email.o',0,'no_group'),(38,'chuanwu','$argon2i$v=19$m=4096,t=3,p=1$84T5/BxmtS5XzEOiZw4vkA$1/o52RxnpkzjmXmtT5I7rM2ztkCftLumA7GHZUPpD5M','test@email.com',0,'no_group'),(42,'test1','$argon2i$v=19$m=4096,t=3,p=1$Zjp+oQnRqrksYnnJ5qeauQ$A8dG2aVAloP0Qz2AN1NUlSg1GoZA3tvY3wrl0vsiJ8o','testemail@email.com',0,'no_group');
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

-- Dump completed on 2022-04-22 15:54:21
