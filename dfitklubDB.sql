CREATE DATABASE  IF NOT EXISTS `dfitklub-fsd` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dfitklub-fsd`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dfitklub-fsd
-- ------------------------------------------------------
-- Server version	8.0.35

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
  `id` varchar(500) NOT NULL,
  `name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `mobileNo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin_001','Edwin Jarvis','user_admin_001','admin_001@dfitklub.com','Abcd1234!@#$','9978236154');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_dispatch`
--

DROP TABLE IF EXISTS `order_dispatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_dispatch` (
  `order_id` varchar(500) NOT NULL,
  `user_id` varchar(500) NOT NULL,
  `prod_id` varchar(500) NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_dispatch`
--

LOCK TABLES `order_dispatch` WRITE;
/*!40000 ALTER TABLE `order_dispatch` DISABLE KEYS */;
INSERT INTO `order_dispatch` VALUES ('0021ca5f-d5a7-4074-a91d-a96e1ad10194','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-30 21:22:13'),('02877122-cd11-447d-bb56-d66f67cb0c57','3ab22168-cd5d-4bb5-acad-829a75be6071','prodEquip001',1,4500,'2024-03-29 14:47:35'),('045d6d14-f0e9-4886-b81d-794bcb037cd2','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-30 21:22:13'),('04ec504e-6b6b-40e0-9ad6-548fb9547c5c','2456622e-13cd-4555-a12e-0fefce70a688','prodWnm002',1,3000,'2024-03-29 14:47:35'),('09b13942-d503-4a44-82aa-b5aa4f3caee8','2456622e-13cd-4555-a12e-0fefce70a688','prodWmn004',1,1300,'2024-03-29 14:47:35'),('0ac64f29-f58c-45d1-8673-4e42cdc0b31c','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn003',1,2000,'2024-03-29 14:50:34'),('0be7d360-12ce-4f63-bb05-96f349e3662c','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpCt001',1,5000,'2024-03-29 14:47:35'),('0c918d43-b369-497d-a456-ba2fa1af7249','777f558f-e762-47df-bb95-70c5a620d2f8','prodEquip003',1,200,'2024-03-30 21:22:13'),('0f822f67-b636-42cd-b391-3bd7a1c02b61','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-30 21:22:13'),('114e681e-32b1-4d4b-a4e7-591bf628f7e0','3ab22168-cd5d-4bb5-acad-829a75be6071','prodCp001',1,2400,'2024-03-30 21:22:13'),('17695740-2014-44ac-a0e9-2e22a8087cb2','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc003',1,850,'2024-03-30 21:22:13'),('17e00445-89f5-48e5-b5f6-4fb442deb83e','315fcb68-7ed0-41f4-b8af-e73dec5e5c17','prodAcc003',4,3400,'2024-04-06 12:40:59'),('19e758ee-f630-4f57-95f5-c7c400b254b1','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn001',1,900,'2024-03-29 14:47:35'),('1c9d5f1c-b4d7-4d98-85b8-b74a956fe7a9','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn003',1,2000,'2024-03-29 16:15:14'),('1cb140b0-4bb1-4cc2-b0ed-9dc5a0705499','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-30 21:22:13'),('1cc04d72-ebb5-428a-b159-fb062e440915','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-30 21:22:13'),('1d76ad78-f011-4db6-ad5f-2749ceaa4bb4','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWnm002',1,3000,'2024-03-30 21:22:13'),('200b58e2-e9c8-47ba-9018-e19a257ab277','2456622e-13cd-4555-a12e-0fefce70a688','prodWmn004',1,1300,'2024-03-29 14:47:35'),('20697b3b-a294-48fe-9a4f-e115caa8b470','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc002',1,250,'2024-03-29 16:15:14'),('20feb100-8151-484f-8234-0d284c79d9f3','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-30 21:22:13'),('2627ae19-6cdd-4cfe-8b97-223abe1c0e3a','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWnm002',1,3000,'2024-03-29 14:56:07'),('28aa7231-bac5-4d35-a92b-18d9cbabea35','777f558f-e762-47df-bb95-70c5a620d2f8','prodEquip004',1,500,'2024-03-30 21:22:13'),('2e6a954d-d95d-4bcd-859b-38c34839130e','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-30 21:22:13'),('325b9027-b1d2-4435-a49e-6066d248aa7c','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc003',1,850,'2024-03-30 21:22:13'),('3285bbf3-5bda-4ea2-922b-aa4736521ad1','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWnm002',1,3000,'2024-03-29 14:47:35'),('347bad3a-cffe-4a49-a179-c7b3a8359d3c','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-30 21:22:13'),('3beae6b1-4479-426d-9786-b772b4278bdd','315fcb68-7ed0-41f4-b8af-e73dec5e5c17','prodCp002',1,400,'2024-04-06 12:40:59'),('3d6b80da-cb2e-4735-9e3f-7b01d2e86fc8','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc002',1,250,'2024-03-29 14:57:39'),('42b3e256-e759-460d-ba7e-3fa325eadb54','315fcb68-7ed0-41f4-b8af-e73dec5e5c17','prodCp001',1,2400,'2024-04-06 12:40:59'),('42d31605-a634-4c25-93fa-ea14eb02940b','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn003',1,2000,'2024-03-29 14:57:39'),('44e95984-23fa-42f7-9634-35bde8457703','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpFb002',1,800,'2024-03-29 14:47:35'),('4638ff0b-42b4-4b42-af20-fc41cd30ac86','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWnm002',1,3000,'2024-03-29 16:15:14'),('4b0c0b9f-7f9e-4362-9565-ac98cc608554','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc001',1,1000,'2024-03-29 16:15:14'),('4c0081bc-ba98-48c3-8144-1378e49fcfd6','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn003',1,2000,'2024-03-29 14:47:35'),('5456b9f6-40c6-4a04-894c-c41d87797576','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWnm002',1,3000,'2024-03-29 14:47:35'),('5772b165-3613-47e5-8244-b0cc0554cc99','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-29 14:47:35'),('588e43fc-bf30-4fe8-b72f-bd33943dc7f0','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc003',1,850,'2024-03-29 16:15:14'),('5b97de9d-eb4a-45f0-ad22-9b703d35e765','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc003',1,850,'2024-03-29 14:57:39'),('5c80d512-db50-44c2-a510-d5ea59e7928e','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn004',1,1300,'2024-03-29 14:47:35'),('5fbdcef1-09c3-42b7-a401-ae8815d9391e','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn001',1,900,'2024-03-29 14:56:07'),('605621d8-c8ec-474d-8428-e7fa8435e1e2','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn004',1,1300,'2024-03-29 14:56:07'),('636a0699-5bcd-404a-8d78-0f3b0624f4f5','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpCt002',1,2500,'2024-03-29 14:56:07'),('63e2dad3-8aed-482c-b64a-ee83f4d771a5','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn004',1,1300,'2024-03-29 14:57:39'),('650bae09-2b21-407e-a7a1-c6d99803677a','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn001',1,900,'2024-03-29 16:15:14'),('6799030e-0ab8-47d5-bcb7-28f55d215db0','3ab22168-cd5d-4bb5-acad-829a75be6071','prodMn005',2,500,'2024-03-29 14:47:35'),('699812fe-670d-4bb7-99f2-b1f225599ba6','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn004',1,1300,'2024-03-29 14:47:35'),('6a93debe-fe80-4550-b273-14814fc5a3a3','3ab22168-cd5d-4bb5-acad-829a75be6071','prodMn002',1,300,'2024-03-29 14:47:35'),('6afcf16d-d486-4a46-bc97-e7e1d3867259','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc003',1,850,'2024-03-30 21:22:13'),('6faed759-cfcc-4249-b41f-1df69a825826','2456622e-13cd-4555-a12e-0fefce70a688','prodAcc003',1,850,'2024-03-29 14:47:35'),('71ee83bb-f2d8-4d13-9cee-a0be62b8184c','2456622e-13cd-4555-a12e-0fefce70a688','prodWmn003',1,2000,'2024-03-29 14:47:35'),('760a9550-c51f-48e1-bff9-b15f40e02839','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpCt002',1,2500,'2024-03-29 14:56:07'),('782f075d-a1a9-4067-a00c-f0be9c6f2dc0','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpFb002',1,800,'2024-03-29 14:47:35'),('78bef2e9-ec23-4016-97ff-6de48b836e2b','3ab22168-cd5d-4bb5-acad-829a75be6071','prodCp001',1,2400,'2024-03-30 21:22:13'),('7a6d1db8-62b1-45c2-8f5d-9dd997151515','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc003',1,850,'2024-03-30 21:22:13'),('7d1cc993-ef30-47d1-90f5-0cba54d2de53','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn003',1,2000,'2024-03-29 14:47:35'),('7f2b8d13-d055-45e1-93aa-043aa53fbf17','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-30 21:22:13'),('81ccca63-b793-48e3-bff1-41c90dec0e06','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpFb001',1,600,'2024-03-29 14:47:35'),('84107b05-2033-4ea7-82bb-e001cf7c7a61','315fcb68-7ed0-41f4-b8af-e73dec5e5c17','prodAcc001',10,10000,'2024-04-06 12:40:59'),('85f91272-6ac5-4883-8cc4-78fbc23ed8a2','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn003',1,2000,'2024-03-29 14:50:34'),('8b0cbc65-ad2c-4b68-846b-2b3b7afb8477','3ab22168-cd5d-4bb5-acad-829a75be6071','prodMn005',2,500,'2024-03-29 14:47:35'),('8b9c749a-8689-429f-8c95-ef2dad6827c8','dd69ea37-eecc-417c-8ce1-16f913d8b87a','prodAcc001',1,1000,'2024-04-08 12:22:35'),('8c4605ff-19f8-4c87-930f-6200e9d8cf0b','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn004',1,1300,'2024-03-29 14:47:35'),('8f396dcb-4fbb-48e5-aac6-7683e3510f87','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-29 14:56:07'),('95a97758-4ebd-45b8-af76-3736506db5cd','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpCt002',1,2500,'2024-03-29 14:56:07'),('96f913c3-1f93-45e8-ba94-f7c7931df300','3ab22168-cd5d-4bb5-acad-829a75be6071','prodEquip002',1,600,'2024-03-29 14:47:35'),('9c09ed50-2ce0-4b46-a4a5-8ca32ea6f46c','dd69ea37-eecc-417c-8ce1-16f913d8b87a','prodAcc002',1,250,'2024-04-08 12:22:35'),('9c2a9a44-4d27-46b6-bb98-8f7c031c5638','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-30 21:22:13'),('9dc556c0-87a9-4f17-8662-de74e121bf57','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-30 21:22:13'),('a0346a66-c848-4de9-8f62-04a89b40778f','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc003',1,850,'2024-03-30 21:22:13'),('a3ccb6ed-d192-48c5-99de-23cfbdc477c6','315fcb68-7ed0-41f4-b8af-e73dec5e5c17','prodAcc002',1,250,'2024-04-06 12:40:59'),('a3fb367f-cb90-4baf-bd0a-c8a7f60a98dd','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn001',1,900,'2024-03-29 14:47:35'),('a401c1b6-4071-4595-8604-bf67f567a3c6','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWnm002',1,3000,'2024-03-29 14:57:39'),('a4c67317-108a-4e18-9b29-93049d52a2dd','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-30 21:22:13'),('a6a87853-bb94-43cd-9b4a-311c2e0c501a','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWnm002',1,3000,'2024-03-29 14:47:35'),('a904c8c6-82ef-4c0c-8a14-d154f089f61f','3ab22168-cd5d-4bb5-acad-829a75be6071','prodMn002',1,300,'2024-03-29 14:47:35'),('a92aa69f-e6e2-4c21-a50b-49529511f54a','315fcb68-7ed0-41f4-b8af-e73dec5e5c17','prodEquip001',1,4500,'2024-04-06 12:40:59'),('ad608c4b-d136-4b3d-a3cc-ca5ae546442b','3ab22168-cd5d-4bb5-acad-829a75be6071','prodEquip002',1,600,'2024-03-29 14:47:35'),('af13a832-6e61-4af8-8e86-b1d01ea585f4','3ab22168-cd5d-4bb5-acad-829a75be6071','prodCp001',1,2400,'2024-03-30 21:22:13'),('b18c258b-5060-48fa-83ce-c1c8746db5fd','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-29 14:47:35'),('b345a8da-a1cd-4f35-a0c5-49b16f1b0bf7','777f558f-e762-47df-bb95-70c5a620d2f8','prodEquip002',1,600,'2024-03-30 21:22:13'),('ba378493-7c7a-4a46-b779-20ce1e126c47','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpCt001',1,5000,'2024-03-29 14:56:07'),('bb6d65fa-8dc3-4e88-8ce3-24db3efe8332','dd69ea37-eecc-417c-8ce1-16f913d8b87a','prodAcc003',1,850,'2024-04-08 12:22:35'),('bfe09148-b14a-4895-a89f-09c0dda1aa04','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn004',1,1300,'2024-03-29 14:47:35'),('c36eaf23-c1c4-4f50-976b-e218b4b276eb','3ab22168-cd5d-4bb5-acad-829a75be6071','prodCp001',1,2400,'2024-03-30 21:22:13'),('c814c366-dbf4-4879-a920-43b3a3b311c1','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc003',1,850,'2024-03-30 21:22:13'),('c959d5b1-78c7-4b67-a1f5-9676766718b4','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpCt001',1,5000,'2024-03-29 14:47:35'),('d0704f01-3274-4305-9cd9-b460e846f63e','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn001',3,2700,'2024-03-29 14:57:39'),('d3aae88b-0be7-44a2-87c1-9338ab2c3836','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn004',1,1300,'2024-03-29 15:12:26'),('d7557aaa-6eb8-4d0b-970a-76970fd52654','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-30 21:22:13'),('d7ebf0a7-9f8d-4aa2-9ddb-f4c635f1095d','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-30 21:22:13'),('dc0c738d-7d35-496b-83f9-c17ce2f4c769','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc001',1,1000,'2024-03-29 16:15:14'),('dc7b03ce-0faf-4f09-8717-a6efcd3bd8f2','2456622e-13cd-4555-a12e-0fefce70a688','prodAcc002',1,250,'2024-03-29 14:47:35'),('de3a7dcd-ac43-4db8-8ef4-13f47f046b14','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-30 21:22:13'),('e37e03c1-2344-4735-b9e5-0e87c9b2a52d','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn003',1,2000,'2024-03-29 14:47:35'),('e5c146f9-d62b-4e02-9026-0dbd1afaad23','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBmt002',1,450,'2024-03-29 14:47:35'),('e6a258bd-864d-43d5-870d-afa1fce139b3','3ab22168-cd5d-4bb5-acad-829a75be6071','prodAcc002',1,250,'2024-03-30 21:22:13'),('e6e0f417-b740-4f9f-8e03-5e09e4128230','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn001',2,1800,'2024-03-29 14:47:35'),('e7f1be2a-50fa-419a-8c6a-9f445becb8ef','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpCt002',1,2500,'2024-03-29 14:47:35'),('e8fa9ab0-d6f4-45f2-bf45-0ee74697862b','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn001',1,900,'2024-03-29 14:47:35'),('eb9ea1d6-d995-46b2-b782-e84057e30a03','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpCt001',1,5000,'2024-03-29 14:56:07'),('ec00ba8d-3dbe-4f9a-920c-6b5338233098','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb001',1,2000,'2024-03-30 21:22:13'),('ed99f562-f7f0-4d3e-aff1-bfc48d4f2397','3ab22168-cd5d-4bb5-acad-829a75be6071','prodEquip001',1,4500,'2024-03-29 14:47:35'),('f4fc0866-f8fe-4e9b-8fd2-572e2d174717','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn001',1,900,'2024-03-29 14:47:35'),('f5e908b8-4889-4607-8eab-ada3d5ab6869','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBmt001',1,1800,'2024-03-29 14:46:07'),('f8439bc2-4118-4e43-a9a6-67b267f121e4','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpBb002',1,850,'2024-03-29 14:47:35'),('f94ead4a-e145-4d84-bc8c-f8a797cd9cd7','3ab22168-cd5d-4bb5-acad-829a75be6071','prodWmn003',1,2000,'2024-03-29 14:50:34'),('fa45b6c1-8906-4e5e-b353-e838390c84d4','3ab22168-cd5d-4bb5-acad-829a75be6071','prodSpFb001',1,600,'2024-03-29 14:47:35');
/*!40000 ALTER TABLE `order_dispatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` varchar(500) NOT NULL,
  `user_id` varchar(500) NOT NULL,
  `prod_id` varchar(500) NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prod_id` varchar(500) NOT NULL,
  `prod_name` varchar(100) NOT NULL,
  `prod_description` varchar(1000) NOT NULL,
  `prod_category` varchar(45) NOT NULL,
  `prod_price` int NOT NULL,
  `prod_rating` decimal(2,1) NOT NULL,
  `prod_img` varchar(255) NOT NULL,
  PRIMARY KEY (`prod_id`,`prod_img`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('prodAcc001','Nivia Duffle Bag ','Nivia Duffle Bag with capacity of 18 Ltrs | Unisex Gym Bags/ Sports &Travel Bag','accessories',1000,4.8,'acc-duff-bag1.webp'),('prodAcc002','CultSport Cotton Masks','Pack of 3 | Protection against pollution, dust and bacteria | Adjustable tie-up','accessories',250,4.4,'acc-mask.webp'),('prodAcc003','CultSport Yoga Mat','Raspberry Pink Yoga Mat | Dimensions : 183cm x 63cm |  Thickness : 6mm | No-slip Grip','accessories',850,4.7,'acc-mat.webp'),('prodCp001','ELITE FitPass','Per Month | Personalized Training | Celebrity Workouts | Smart Workout Plans | ELITE Benefits','coupons',2400,5.0,'fp-elite.png'),('prodCp002','HOME FitPass','Per Month | Customizable Home Workouts | Detailed Guides | Mental Strength | Health Monitoring','coupons',400,5.0,'fp-home.png'),('prodCp003','PRO FitPass','Per Month | Group Classes | Smart Workout Plans | Progress Tracking | PRO Benefits','coupons',1600,5.0,'fp-pro.png'),('prodEquip001','7.5kgx2 Hex Dumbbell','Rubber coated with Chrome Handles | Color: Black | Weight: 15 kg (7.5+7.5)','equipments',4500,4.8,'equip-7-half-db.webp'),('prodEquip002','CultSport Speed Rope','With non-slip mettalic handles | Adjustable length | Easy to carry and maintain','equipments',600,4.8,'equip-jump-rope2.webp'),('prodEquip003','CultSport Fitness Grip','For building hand strength and stretching muscles |Colour: Black | Material: Spring + Foam | Durable','equipments',200,4.6,'equip-fit-grip.webp'),('prodEquip004','CultSport Push Up Bar','Pair of push up bars | Colour: Black | Material: PP+PVC | Sweat Absorption and Protection to Floor','equipments',500,4.6,'equip-push-bar.webp'),('prodMn001','X1 Men Training Shoes','Colour: Black | Size: UK9 | Sport: Training or Gym | Cushioning: Medium | Rebound: High |  Arch Type: Medium | Sole Material: Rubber | Step-in Comfort | Closure Type: Lace','men',3000,4.7,'mn-shoes1.webp'),('prodMn002','Technosport Men\'s Sleeveless Crew Neck Active T-Shirt','Colour:PINE GREEN | Size: 40/L | Fabric: Polyester | Temprature Control | Quick Dry Fabric | Anti-Microbial Quality | SPF 50+ Protection','men',300,4.5,'mn-vst1.webp'),('prodMn003','All Day Comfort Solid Shorts','Colour: Black | Size: 40/L |  Fabric: 75% Nylon 25% Spandex | Moisture Wicking | 4-Way Stretch | Stretch Recovery | Warp Knit | Quick Dry','men',750,4.5,'mn-shrts2.webp'),('prodMn004','Textured Classic Polo T-shirt','Colour: Blue | Size:42/XL | Fabric: 91% Polyester 9% Spandex | Moisture Wicking |  Anti Microbial | Supersoft | Stretch Recovery','men',400,4.8,'mn-polot.webp'),('prodMn005','Flo Sweat Absorbing EVA Flip Flops','Cushioned foot bed | Colour: Olive | Material: EVA | Light weight | Anti Skid surface | Soft and Durable | Sweat Absorbing','men',250,4.9,'mn-flipflops.webp'),('prodSpBb001','Vector X- COSMIC','Colour: Black-Blue | Size: UK10 | Sport: Baksetball | Material: Synthetic Leather | Sole Material: EVA+Rubber | Breathable Mesh | Step-in Comfort | Closure Type: Lace','sports-bskt',2000,4.4,'sp-basket-shoes.webp'),('prodSpBb002','Spalding Slamdunk Rubber Basketball','Colour: Black | Size: 6 | Weight: 800 grams | Great Grip and Feel, Durable outer Cover | Material: Rubber | Core/Bladder Material :Synthetic Rubber | Construction Type : Moulded | Waterproof :Yes','sports-bskt',850,4.6,'sp-basket-ball.webp'),('prodSpBmt001','YONEX Astrox 27i Badminton Racket','Cover: Full Cover | Frame Material: Graphite | Strung Type: Strung | Grip Size: G4 -3.25 Inches | Head Shape: Isometric Shape | Playing Level : Beginners | Balance : 315 mm | String Tension : 20-30 lbs','sports-bad',1800,4.7,'sp-bad-racquet.webp'),('prodSpBmt002','YONEX Mavis 200i Badminton Shuttle','Pack of 6 Shuttles | Nylon | Recycled Cork Base Material | Nylon Skirt Material | Slow 75 | Fast Recovery & Stable Trajectory','sports-bad',450,4.5,'sp-bad-shuttle.webp'),('prodSpCt001','DSC Cricket Kit Bag','Complete Kit bag for all sizes | Cricket Kit Includes : Cricket Bat (with cover) + Legguard + Batting Gloves + Kitbag + Thigh Guard + Arm Guard + Abdo Guard+ Trycom Brand Ball+ Helmet','sports-cric',5000,4.5,'sp-cric-kit.webp'),('prodSpCt002','NIVIA crick-1000','Colour: Aster Blue/White | Size: UK9 | Sport: Cricket | Spacer mesh with TPU Fusion Technology | Durable & Comfortable  | Step-in Comfort | Lightweight Cushioning | Closure Type: Lace','sports-cric',2500,4.3,'sp-cric-shoes.webp'),('prodSpFb001','Nivia Storm Football','Colour: White | Size: 5 | Weight: 500 grams | Material: Rubber |  Rubberized Moulded | Suitable for Hard Ground Without Grass','sports-foot',600,4.4,'sp-foot-ball.webp'),('prodSpFb002','Vector X - ULTRA','Color: White::Skyblue | Size: UK | Sport: Football | Material: Synthetic Leather | Step-in Comfort | Lightweight Insole | Water Resistant | Closure Type: Lace','sports-foot',800,4.4,'sp-foot-shoes.webp'),('prodWmn001','Solid Racerback Tank Top','Colour: Pink | Fabric: 75% Nylon 25% Spandex | Racerback | Breathable fabric | Compact | Soft Rib top for stretch and comfort','women',900,4.9,'wmn-t1.webp'),('prodWmn003','Marble Print Co-Ord Set','Colour: Teal | Size: M | Fabric: 80% Polyester 20% Spandex | Anti-Chafing Seam | Flydry | No Transparency | Moisture Wicking | Slip On | Anti slip waistband | No Camel toe','women',2000,4.6,'wmn-coord.webp'),('prodWmn004','Hooded Sweatshirt with Kangaroo Pockt','Colour: Pink | Size: S | Fabric: 88% Cotton 12% Polyester | Functional Kangaroo Pocket | Adjustable Hood | Allow Air Circulation | Prevent Overheating','women',1300,4.6,'wmn-hood.webp'),('prodWnm002','X1 Women Training Shoes','Colour: Purple | Size: UK5 | Sport: Training or Gym | Cushioning: Medium | Rebound: High | Arch Type: Medium | Sole Material: Rubber | Step-in Comfort','women',3000,4.7,'wmn-shoes1.webp');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(500) NOT NULL,
  `name` varchar(45) NOT NULL,
  `dateOfbirth` date NOT NULL,
  `bloodgroup` varchar(5) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `mobileNo` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  `address` varchar(300) NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(15) NOT NULL,
  PRIMARY KEY (`id`,`username`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2456622e-13cd-4555-a12e-0fefce70a688','Sophie Watson','1996-04-15','A+','Female','sophie.watson2@gmail.com','9874103652','sophie_2','Pass@1234','65C, Downtown, Manhattan, New York','United States of America','10013'),('24eb2dd7-6bd4-4d78-8c12-003e247b11a5','Rajveer Nanda','1994-01-21','B-','Male','rajveer.nanda32@gmail.com','748965130','rVnanda','Pass@1234','32, Rajpura Road, Dehradun','India','248009'),('315fcb68-7ed0-41f4-b8af-e73dec5e5c17','kunal jain','2024-04-26','A+','Male','cat@cat.com','1234567890','apple','12345678','apple nagar','apple','123456'),('3ab22168-cd5d-4bb5-acad-829a75be6071','Ruby Roundhouse','1996-03-16','B-','Female','ruby234round@hotmail.com','7410963258','kTil_hsena','Pass@1234','Jurgen\'s Castle, Mount James Walker','Canada','RM06B75'),('777f558f-e762-47df-bb95-70c5a620d2f8','Dave Bryson','1990-03-24','O+','Male','dave.bryson243@gmail.com','9783645210','_dave243','Pass@1234','B-54, Uptown, Queens, California','United States of America','11357'),('dd69ea37-eecc-417c-8ce1-16f913d8b87a','Dr. Xander \"Smolder\" Bravestone','1985-09-16','A-','Male','smolder.bravestone@jumanji.com','8674152930','DRbravestone','Pass@1234','Jurgen\'s Castle, Mount James Walker','Canada','RM06B75');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-08 12:49:47
