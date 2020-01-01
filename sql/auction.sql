-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: auction
-- ------------------------------------------------------
-- Server version	5.7.27-log

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` char(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(11) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('AD001','Tuyet Chung','tranthituyetchung@gmail.com','0123456789','1999-06-24','admin01','123456');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auctionedproduct`
--

DROP TABLE IF EXISTS `auctionedproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auctionedproduct` (
  `id_user` char(11) NOT NULL,
  `id_product` char(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_aucproduct_product_idx` (`id_product`),
  CONSTRAINT `fk_aucproduct_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_aucproduct_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auctionedproduct`
--

LOCK TABLES `auctionedproduct` WRITE;
/*!40000 ALTER TABLE `auctionedproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `auctionedproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auctionhistory`
--

DROP TABLE IF EXISTS `auctionhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auctionhistory` (
  `id_product` char(11) NOT NULL,
  `time` datetime DEFAULT NULL,
  `bidPrice` float DEFAULT NULL,
  `user` char(11) DEFAULT NULL,
  KEY `fk_aucHistory_user_idx` (`user`),
  KEY `fk_aucHistory_product_idx` (`id_product`),
  CONSTRAINT `fk_aucHistory_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_aucHistory_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auctionhistory`
--

LOCK TABLES `auctionhistory` WRITE;
/*!40000 ALTER TABLE `auctionhistory` DISABLE KEYS */;
INSERT INTO `auctionhistory` VALUES ('P0001','1999-06-24 12:37:05',1000,'U0001'),('P0001','1999-06-24 12:37:05',2000,'U0002'),('P0001','1999-06-24 12:37:05',3000,'U0003'),('P0001','1999-06-24 12:37:05',4000,'U0001'),('P0001','1999-06-24 12:37:05',5000,'U0004'),('P0002','1999-06-24 12:37:05',1000,'U0001'),('P0002','1999-06-24 12:37:05',2000,'U0001'),('P0002','1999-06-24 12:37:05',3000,'U0001'),('P0002','1999-06-24 12:37:05',4000,'U0001'),('P0002','1999-06-24 12:37:05',5000,'U0001'),('P0002','1999-06-24 12:37:05',1000,'U0002'),('P0002','1999-06-24 12:37:05',2000,'U0003'),('P0002','1999-06-24 12:37:05',3000,'U0004'),('P0002','1999-06-24 12:37:05',4000,'U0001'),('P0002','1999-06-24 12:37:05',5000,'U0005');
/*!40000 ALTER TABLE `auctionhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biddingproduct`
--

DROP TABLE IF EXISTS `biddingproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `biddingproduct` (
  `id_user` char(11) DEFAULT NULL,
  `id_product` char(11) DEFAULT NULL,
  KEY `fk_bidding_product_idx` (`id_product`),
  KEY `fk_bidding_user` (`id_user`),
  CONSTRAINT `fk_bidding_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_bidding_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biddingproduct`
--

LOCK TABLES `biddingproduct` WRITE;
/*!40000 ALTER TABLE `biddingproduct` DISABLE KEYS */;
INSERT INTO `biddingproduct` VALUES ('U0001','P0001'),('U0001','P0002'),('U0005','P0002'),('U0002','P0002'),('U0003','P0002'),('U0004','P0004');
/*!40000 ALTER TABLE `biddingproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` char(11) NOT NULL,
  `NAME` varchar(45) DEFAULT NULL,
  `link` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('C0001','ELECTRONIC DEVICE',NULL),('C0002','HOUSEHOLD APPLIANCE',NULL),('C0003','BEAUTY',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameter` (
  `sell_product_cost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameter`
--

LOCK TABLES `parameter` WRITE;
/*!40000 ALTER TABLE `parameter` DISABLE KEYS */;
INSERT INTO `parameter` VALUES (1000);
/*!40000 ALTER TABLE `parameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` char(11) NOT NULL,
  `category` char(11) NOT NULL,
  `id_seller` char(11) DEFAULT NULL,
  `id_bidder` char(11) DEFAULT NULL,
  `bidStep` int(11) DEFAULT NULL,
  `currentPrice` float NOT NULL,
  `buynowPrice` int(11) DEFAULT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `details` varchar(5000) DEFAULT NULL,
  `auctioned` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_product_category_idx` (`category`),
  KEY `fk_product_bidder_idx` (`id_bidder`),
  CONSTRAINT `fk_product_bidder` FOREIGN KEY (`id_bidder`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_seller` FOREIGN KEY (`id_bidder`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('P0001','C0001','U0002','U0003',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',0),('P0002','C0003','U0002','U0001',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',0),('P0003','C0001','U0004','U0005',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',0),('P0004','C0002','U0002','U0007',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',0),('P0005','C0003','U0004','U0009',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',0),('P0006','C0002','U0004','U0001',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',1),('P0007','C0003','U0002','U0001',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',1),('P0008','C0002','U0006','U0003',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',1),('P0009','C0001','U0002','U0005',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',1),('P0010','C0001','U0002','U0007',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',1),('P0011','C0003','U0002','U0009',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',0),('P0012','C0002','U0006','U0001',100,5000,10000,'1999-06-24 12:37:05','1999-06-24 12:37:05','GOOD PRODUCT',0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id_user` char(11) NOT NULL,
  `review` varchar(1000) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `reviewer` char(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_review_reviewer_idx` (`reviewer`),
  CONSTRAINT `fk_review_reviewer` FOREIGN KEY (`reviewer`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES ('U0002','GOOD GOOD GOOD',1,'1999-06-24 12:37:05','U0001'),('U0004','FAKE FAKE FAKE',0,'1999-06-24 12:37:05','U0001'),('U0006','GOOD GOOD GOOD',1,'1999-06-24 12:37:05','U0001'),('U0008','FAKE FAKE FAKE',0,'1999-06-24 12:37:05','U0001'),('U0010','GOOD GOOD GOOD',1,'1999-06-24 12:37:05','U0001');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` char(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(11) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('U0001',0,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung','123456'),('U0002',1,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung1','123456'),('U0003',0,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung2','123456'),('U0004',1,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung3','123456'),('U0005',0,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung4','123456'),('U0006',1,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung5','123456'),('U0007',0,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung6','123456'),('U0008',1,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung7','123456'),('U0009',0,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung8','123456'),('U0010',1,'TUYET CHUNG','0123456789','tuyetchung@gmail.com','1999-06-24 12:37:05','tuyetchung9','123456');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `id_user` char(11) DEFAULT NULL,
  `id_product` char(11) DEFAULT NULL,
  KEY `fk_watchList_product_idx` (`id_product`),
  KEY `fk_watchlist_user` (`id_user`),
  CONSTRAINT `fk_watchlist_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_watchlist_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
INSERT INTO `watchlist` VALUES ('U0001','P0001'),('U0002','P0001'),('U0001','P0003'),('U0001','P0004'),('U0001','P0005'),('U0003','P0001'),('U0004','P0001'),('U0006','P0001'),('U0007','P0001'),('U0008','P0001'),('U0009','P0001'),('U0010','P0001'),('U0005','P0001');
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-18 16:18:00
