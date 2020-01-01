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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(12) CHARACTER SET latin1 DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `username` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','tranthituyetchung@gmail.com','0123456789','1999-06-24','admin','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `link` varchar(2000) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'ELECTRONIC DEVICE',NULL,'Make your life more convinience'),(2,'HOUSEHOLD APPLIANCE',NULL,'Thing in home'),(3,'BEAUTY',NULL,'Make you more beautyful'),(4,'LAPTOP',NULL,'Laptop low price'),(5,'SMARTPHONE',NULL,'Smartphone good price');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(1000) DEFAULT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (1,'Hello','How are you'),(2,'Hi','I\'m fine. Thank you, and you?'),(3,'Ohh','I\'m fine too. Nice to meet you'),(4,'Yess','Nice to meet you too');
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameter` (
  `sell_product_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameter`
--

LOCK TABLES `parameter` WRITE;
/*!40000 ALTER TABLE `parameter` DISABLE KEYS */;
/*!40000 ALTER TABLE `parameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `id_bidder` int(11) DEFAULT NULL,
  `id_owner` int(11) DEFAULT NULL,
  `bid_step` int(11) DEFAULT NULL,
  `current_price` int(11) DEFAULT NULL,
  `buy_now_price` int(11) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `details` varchar(5000) DEFAULT NULL,
  `auctioned` int(11) DEFAULT NULL,
  `auctionTIme` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_category_idx` (`category`),
  KEY `fk_product_seller_idx` (`id_owner`),
  KEY `fk_product_bidder_idx` (`id`,`id_bidder`),
  KEY `fk_product_bidder_idx1` (`id_bidder`),
  CONSTRAINT `fk_product_bidder` FOREIGN KEY (`id_bidder`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_owner` FOREIGN KEY (`id_owner`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Laptop A',1,3,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,1),(2,'Laptop B',1,1,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,1),(3,'Laptop C',1,2,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,1),(4,'Laptop D',1,3,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(5,'Laptop E',1,4,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(6,'Laptop F',1,5,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(7,'Laptop G',1,3,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,5),(8,'Laptop H',1,8,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(9,'Laptop I',1,9,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(10,'Laptop K',1,10,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(11,'Laptop M',1,20,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(12,'Laptop L',1,21,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(13,'Laptop N',1,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(14,'Laptop E',1,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(15,'Laptop O',1,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(16,'Laptop F',1,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(17,'Laptop Q',1,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(18,'Laptop W',1,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(19,'Laptop T',1,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(20,'Laptop Y',1,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(21,'Household A',2,3,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(22,'Household B',2,1,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(23,'Household C',2,2,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(24,'Household D',2,3,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(25,'Household E',2,4,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,5),(26,'Household F',2,5,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(27,'Household G',2,3,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(28,'Household H',2,8,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,7),(29,'Household I',2,9,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(30,'Household K',2,10,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(31,'Household M',2,20,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(32,'Household L',2,21,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(33,'Household N',2,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,7),(34,'Household E',2,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(35,'Household O',2,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(36,'Household F',2,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(37,'Household Q',2,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(38,'Household W',2,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,1),(39,'Household T',2,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,5),(40,'Household Y',2,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,7),(41,'Beauty A',3,3,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(42,'Beauty B',3,1,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(43,'Beauty C',3,2,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(44,'Beauty D',3,3,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(45,'Beauty E',3,4,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,5),(46,'Beauty F',3,5,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(47,'Beauty G',3,3,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(48,'Beauty H',3,8,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,7),(49,'Beauty I',3,9,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(50,'Beauty K',3,10,30,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,7),(51,'Beauty M',3,20,29,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(52,'Beauty L',3,21,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(53,'Beauty N',3,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(54,'Beauty E',3,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(55,'Beauty O',3,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,5),(56,'Beauty F',3,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,2),(57,'Beauty Q',3,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,4),(58,'Beauty W',3,29,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,7),(59,'Beauty T',3,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,3),(60,'Beauty Y',3,30,28,100000,2000000,3000000,'2019-09-20','2020-01-08','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',0,7),(61,'Laptop Q',1,30,28,100000,2000000,3000000,'2019-09-20','2020-01-01','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',1,5),(62,'Laptop W',1,29,28,100000,2000000,3000000,'2019-09-20','2020-01-01','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',1,5),(63,'Laptop T',1,30,28,100000,2000000,3000000,'2019-09-20','2020-01-01','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',1,5),(64,'Laptop Y',1,30,28,100000,2000000,3000000,'2019-09-20','2020-01-01','Tích hợp liền mạch PC / điện thoại thông minh: Truy cập nhiều thiết bị mà không cần phân chia sự chú ý của bạn Dell Dell Connect Connect ghép nối điện thoại thông minh iOS hoặc Android của bạn với máy tính xách tay.\nHạn chế sự gián đoạn: Với Dell Mobile Connect, bạn có thể thực hiện cuộc gọi, gửi văn bản, nhận thông báo và thậm chí phản chiếu điện thoại Android của mình lên PC để tương tác với tất cả các ứng dụng yêu thích của bạn.',1,5);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_reviewer` int(11) DEFAULT NULL,
  `review` varchar(1000) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_review_user_idx` (`id_user`),
  KEY `fk_review_reviewer_idx` (`id_reviewer`),
  CONSTRAINT `fk_review_reviewer` FOREIGN KEY (`id_reviewer`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `phone` varchar(12) CHARACTER SET latin1 DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `username` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,0,'chung','tranthituyetchung@gmail.com','0123456789','1999-06-24','tuyetchung1','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(2,0,'chung tuyet','tranthituyetchung@gmail.com','0123456789','1999-06-24','tuyetchung2','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(3,0,'tuyet chung','tranthituyetchung@gmail.com','0123456789','1999-06-24','tuyetchung3','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(4,0,'hoang anh','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang1','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(5,0,'anh hoang','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang2','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(6,0,'tran chung','tranthituyetchung@gmail.com','0123456789','1999-06-24','tuyetchung4','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(7,0,'gia loi','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi1','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(8,0,'Tuyết Chung','tranthituyetchung@gmail.com','0123456789','1999-06-24','tuyetchung5','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(9,0,'Trần Thị Tuyết Chung','tranthituyetchung@gmail.com','0123456789','1999-06-24','tuyetchung6','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(10,0,'Trương Nguyễn Anh Hoàng','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang3','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(11,0,'Nguyễn Tân Gia Lợi','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi2','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(12,0,'Anh Hoàng','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang4','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(13,0,'Gia Lợi','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi3','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(14,0,'Hoàng Nguyễn','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang5','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(15,0,'Lợi Trương','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi4','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(16,0,'Hoàng Trương','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang6','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(17,0,'Lợi Nguyễn','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi5','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(18,0,'Lợi Trần','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi6','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(19,0,'Chung Tuyết','tranthituyetchung@gmail.com','0123456789','1999-06-24','tuyetchung7','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(20,0,'Trương Hoàng','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang7','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(21,0,'Nguyễn Lợi','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi7','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(22,0,'Nguyễn Gia Lợi','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi8','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(23,0,'Trương Anh Hoàng','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang8','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(24,0,'Nguyễn Lợi','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi9','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(25,0,'Anh Hoàng','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang9','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(26,0,'Gia Lợi','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi10','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(27,0,'Lợi Gia Nguyễn','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi11','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(28,1,'Tuyết Chung','tranthituyetchung@gmail.com','0123456789','1999-06-24','tuyetchung','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(29,1,'Anh Hoàng','tranthituyetchung@gmail.com','0123456789','1999-06-24','anhhoang','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG'),(30,1,'Gia Lợi','tranthituyetchung@gmail.com','0123456789','1999-06-24','gialoi','$2a$10$4VgAdkSJIJYP3ZbUEiFGhOY9MOJSC5Ju/l6DLpYhbDAcH7L20EYpG');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) DEFAULT NULL,
  KEY `fk_watchlist_user_idx` (`id_user`),
  KEY `fk_watchlist_product_idx` (`id_product`),
  CONSTRAINT `fk_watchlist_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_watchlist_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
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

-- Dump completed on 2020-01-01 10:11:34
