CREATE DATABASE  IF NOT EXISTS `mode` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mode`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mode
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminName` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `hashedPassword` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Super admin','test@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$43kZVAE4PQGjyHSDYQ/NSA$qbuXdUqfthf+4z1smJ3XS9d9DTAmOiZ0ajsbcVNOEVo'),(2,'test','test2@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$X304ayHb9B44ar/CJWjqXw$YLCbRasedu/a/UpxJBTA+LU3RxexO7O9Ha6CiNf+NRs'),(3,'test','test3@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$ldmuo/2DHlufE/EYWLWGGA$0YkbJd1/ZAS7J7VDrDWpKKrP+Mkh6GM4x6hsTQ4wbY0'),(4,'test','test4@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$HMwnT0gDBf5ksd97aC8cPQ$Ze83UCi8VzUzEA32Z4Oj/Hs37KB38uzx1kuqHrNDq3o'),(5,'test','test5@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$bjFu5tVadpYP/RRHFwyRpQ$XjeGXOon3nR7kIpJRw0YVBDiSzL+W5E3SB/G+is2UO8'),(13,'Sophie V','test11@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$H6/qlpINslDdDZKHVSBcgw$N6abRzBGvGYKiNFGV2latlH4w76l2PpHUtx3EK8FVT8'),(15,'Nouveau nom de carte','sophie.lamant31@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$8boaM9Uw2Bw5w4q38Hqmxg$fwoyQ6DoHaLuw5wdRLzA2FVJnOLWcmUE8NKcPE+GUe0'),(16,'dddd','sophie.varoquier8@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$YhA265zNrGY03D6X3TVUYg$Yf/OHuMOxbcDeTA4Wwvhndk8Ehu/RrEcMMpi5wLng4w');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Nike','nike.jpg','USA'),(2,'Adidas','adidas.png','Germany'),(3,'Le Coq Sportif','coqSportif.png','France'),(4,'Puma','puma.png','Germany'),(5,'Asics','asics.png','Japan'),(6,'The North Face','northFace.png','USA'),(7,'Arena','arena.png','Italia'),(8,'Fouganza','fouganza.png','France');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes`
--

DROP TABLE IF EXISTS `clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `sections_id` int NOT NULL,
  `brands_id` int NOT NULL,
  `targets_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_clothes_sections1_idx` (`sections_id`),
  KEY `fk_clothes_brands1_idx` (`brands_id`),
  KEY `fk_clothes_targets1_idx` (`targets_id`),
  CONSTRAINT `fk_clothes_brands1` FOREIGN KEY (`brands_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `fk_clothes_sections1` FOREIGN KEY (`sections_id`) REFERENCES `sections` (`id`),
  CONSTRAINT `fk_clothes_targets1` FOREIGN KEY (`targets_id`) REFERENCES `targets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes`
--

LOCK TABLES `clothes` WRITE;
/*!40000 ALTER TABLE `clothes` DISABLE KEYS */;
INSERT INTO `clothes` VALUES (1,'CHAUSSURES DE TENNIS FEMME GEL SOLUTION SPEED FF','Ces chaussures de tennis sont conçues pour la joueuse experte pratiquant sur tout type de surface, à la recherche d\'un produit dynamique, confortable. Ces chaussures, reconnues pour ses qualités de confort et de dynamisme, sont une référence sur le marché du tennis féminin.','1.jpg',110.00,1,5,1),(2,'CHAUSSURES DE RUNNING HOMME ADIDAS DURAMO','Ces baskets ont une tige en mesh semi-recyclé qui est légère et respirante tandis que les superpositions sans couture offrent un soutien supplémentaire. Elles sont dotées d\'un col de cheville rembourré avec une fermeture à lacets pour un ajustement parfait/','2.jpg',60.00,1,2,2),(3,'CHAUSSURES NIKE DUNK LOW','Depuis des décennies, la Dunk est l\'une des sneakers préférées de nombreuses cultures sportives. Cuir durable, silhouette classique, confort unique : aujourd\\\'hui, nous revisitons cette chaussure emblématique des années 80 pour le plus grand plaisir d\'une nouvelle génération de fans.','3.webp',69.99,1,1,3),(4,'JOGGING FEMME LE COQ SPORTIF TRAINING PERF','Pantalon d\'entrainement femme - Mini Molleton 220gr coton/polyester/élasthane - Traitement respirabilité, permet d\'optimiser l\'absorption de l\'humidité libérée par le corps (éliminant les risques d\'hyperthermie et d\'hypothermie)','4.jpg',70.99,2,3,1),(5,'PANTALON HOMME PUMA TEAM CUP CASUALS','Ce pantalon pour homme à la fois design et fonctionnel est parfait pour vous accompagner lors de vos séances d\'entrainements réguliers.','5.jpg',29.50,2,4,2),(7,'MAILLOT DE BAIN UNE PIECE NATATION FEMME ARENA SOLID TECH','Arena a conçu ce maillot de bain une pièce pour la nageuse experte qui recherche la performance et a besoin de maintien et de liberté de mouvements.','7.webp',37.00,3,7,1),(8,'MAILLOT DE BAIN SLIP NATATION HOMME ARENA','Ce slip de bain pour hommes est conçu pour les nageurs réguliers. Le slip procure une grande liberté de mouvements et un maximum de contact avec l\'eau.','8.webp',20.00,3,7,2),(9,'MAILLOT DE BAIN NATATION FILLE ARENA SPOTLIGHT MAX SWIM PRO','Arena a conçu ce maillot de bain pour la jeune nageuse confirmée qui recherche la performance et une grande liberté de mouvements.','9.webp',28.00,3,7,3),(10,'VESTE EN POLAIRE ZIPPÉE THE NORTH FACE POUR FEMME','De la polaire sherpa 100 % recyclée donne à cette veste zippée Royal Arch son style rétro unique, mais sa coupe décontractée est en plein dans l\'air du temps. Ses superpositions déperlantes vous protègeront des intempéries.','10.webp',170.00,4,6,1),(11,'VESTE EN POLAIRE THE NORTH FACE GLACIER POUR HOMME','Indispensable à la panoplie de tout randonneur, la veste en polaire TKA Glacier est chaude, légère et respirante. Robuste et résistant aux bouloches, son polyester recyclé repousse naturellement l\'humidité et sèche rapidement.','11.png',85.00,4,6,2),(12,'POLAIRE GLACIER THE NORTH FACE POUR ADOLESCENT','Indispensable à la panoplie de tout randonneur, la polaire Glacier est chaude, légère et respirante. Robuste et anti-bouloches, sa matière en polyester repousse naturellement l\'humidité et sèche rapidement.','12.png',40.00,4,6,3),(13,'LEGGING TECH YOGA PUMA FEMME EN COTONS RESPONSABLES','Vous cherchez un bas technique et naturel pour vos séances de yoga ? Notre équipe a choisi du coton avec une belle tenue et une coupe slim pour tous vos asanas','13.jpg',18.00,5,4,1),(14,'SHORT YOGA DOUX HOMME ECO CONCU ASICS','Notre équipe de yogis hommes a imaginé ce short qui vous reconnecte aux racines du yoga en Inde.','14.webp',15.00,5,5,2),(15,'PANTALON YOGA FILLE NIKE','Ce pantalon est souple et confortable grâce à sa composition coton mêlé à l\'élasthanne et sa coupe bien ajustée, longueur cheville, pour un tombé parfait et une liberté de mouvement optimisée ','15.jpg',10.00,5,1,3),(16,'CASQUE ÉQUITATION 500 FOUGANZA POUR FEMME','Envie d\'un casque d\'équitation sobre aux lignes épurées ? Le 500 est fait pour vous ! Il allie sécurité, confort et ventilation. Et en bonus, le bonnet intérieur amovible est lavable en machine !','16.jpg',35.00,6,8,1),(17,'CASQUE ÉQUITATION 500 FOUGANZA POUR HOMME','Envie d\'un casque d\'équitation sobre aux lignes épurées ? Le 500 est fait pour vous ! Il allie sécurité, confort et ventilation. Et en bonus, le bonnet intérieur amovible est lavable en machine !','17.jpg',40.00,6,8,2),(18,'CASQUE ÉQUITATION 100 FOUGANZA POUR ENFANT','Vous démarrez à poney ou à cheval ? Optez pour notre casque 100, qui a l\'avantage d\'être confortable et facilement réglable grâce à sa mollette arrière. Un équipement optimal pour vous lancer.','18.jpg',29.00,6,8,3);
/*!40000 ALTER TABLE `clothes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_has_colors`
--

DROP TABLE IF EXISTS `clothes_has_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_has_colors` (
  `clothes_id` int NOT NULL,
  `colors_id` int NOT NULL,
  PRIMARY KEY (`clothes_id`,`colors_id`),
  KEY `fk_clothes_has_colors_colors1_idx` (`colors_id`),
  KEY `fk_clothes_has_colors_clothes_idx` (`clothes_id`),
  CONSTRAINT `fk_clothes_has_colors_clothes` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_clothes_has_colors_colors1` FOREIGN KEY (`colors_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_has_colors`
--

LOCK TABLES `clothes_has_colors` WRITE;
/*!40000 ALTER TABLE `clothes_has_colors` DISABLE KEYS */;
INSERT INTO `clothes_has_colors` VALUES (1,1),(2,1),(4,1),(5,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(3,2),(4,2),(5,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(14,2),(15,2),(18,2),(1,3),(2,3),(10,3),(11,3),(12,3),(13,3),(14,3),(16,3),(17,3),(18,3),(3,4),(8,4),(9,4),(4,5),(5,5),(14,5),(15,5),(18,5),(3,6),(7,6),(9,6);
/*!40000 ALTER TABLE `clothes_has_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_has_sizes`
--

DROP TABLE IF EXISTS `clothes_has_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_has_sizes` (
  `clothes_id` int NOT NULL,
  `sizes_id` int NOT NULL,
  PRIMARY KEY (`clothes_id`,`sizes_id`),
  KEY `fk_clothes_has_sizes_sizes1_idx` (`sizes_id`),
  KEY `fk_clothes_has_sizes_clothes1_idx` (`clothes_id`),
  CONSTRAINT `fk_clothes_has_sizes_clothes1` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_clothes_has_sizes_sizes1` FOREIGN KEY (`sizes_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_has_sizes`
--

LOCK TABLES `clothes_has_sizes` WRITE;
/*!40000 ALTER TABLE `clothes_has_sizes` DISABLE KEYS */;
INSERT INTO `clothes_has_sizes` VALUES (4,1),(7,1),(9,1),(10,1),(12,1),(13,1),(15,1),(16,1),(18,1),(4,2),(5,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(4,3),(5,3),(7,3),(8,3),(9,3),(10,3),(11,3),(13,3),(14,3),(16,3),(17,3),(4,4),(5,4),(7,4),(8,4),(10,4),(11,4),(13,4),(14,4),(17,4),(4,5),(5,5),(7,5),(8,5),(10,5),(11,5),(4,6),(5,6),(7,6),(8,6),(4,7),(7,7),(9,7),(12,7),(15,7),(18,7),(3,8),(3,9),(3,10),(3,11),(3,12),(1,13),(3,13),(1,14),(1,15),(1,16),(2,16),(1,17),(2,17),(1,18),(2,18),(1,19),(2,19),(2,20),(2,21),(2,22);
/*!40000 ALTER TABLE `clothes_has_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'noir','black.jpg'),(2,'bleu','blue.jpg'),(3,'marron','brown.jpg'),(4,'rouge','red.jpg'),(5,'blanc','white.jpg'),(6,'jaune','yellow.jpg');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(1000) DEFAULT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'Combien de temps ai-je pour retourner un article ?','Vous avez 15 jours à partir de la date de la facture'),(2,'Qui puis-je contacter en cas de question ?','Vous pouvez appeler notre service client de 10h à 13h et de 14h à 18h, du lundi au vendredi au : 05.61.61.61.61. Vous avez également accès à un formulaire en ligne.'),(3,'Comment puis-je savoir où en est ma commande ?','Rendez-vous sur la rubrique \"suivre ma commande\" via le lien en bas de page ou bien en vous connectant à votre compte'),(4,'Est-ce que ces produits respectent la législation sur le travail des enfants ?','Tout-à-fait');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rate` int DEFAULT NULL,
  `comment` varchar(1000) NOT NULL,
  `feedbacksTypes_id` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`feedbacksTypes_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_formInputs_formInputsTypes1_idx` (`feedbacksTypes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,'Marc','','',5,'super produits, je recommande fortement',4,'2022-08-20 17:24:12'),(2,'Sophie','Lamant','sophie.lamant31@gmail.com',4,'livraison rapide, produits conformes à la description',3,'2022-10-20 17:24:12'),(3,'Véro','Lamant','vlamant@gmal.com',5,'je n\'achèterai mes articles de sport qu\'ici, à partir de maintenant. Un super plan !!!',3,'2022-09-20 17:24:12'),(5,'Sophie','Lamant','sophie.lamant31@gmail.com',NULL,'c\'est un test',2,'2022-09-20 17:24:12'),(6,'Sophie','Lamant','sophie.lamant31@gmail.com',1,'nul',3,'2022-10-01 17:24:12'),(7,'Véro','Aiello','sophie.lamant31@gmail.com',3,'à vomir',3,'2022-10-02 17:24:12'),(8,'Gégé','Raldine','g@gmail.com',4,'Super, site, VRAIMENT !',3,'2022-10-03 17:24:12'),(9,'Lola','Gérard','l@gmail.com',5,'J\'adore faire mon shopping ici, pur les enfants, c\'est top !',3,'2022-10-04 17:24:12'),(10,'Joshua','Lamant','sophie.lamant31@gmail.com',5,'Coucou, c\'est super !!!',3,'2022-10-12 17:24:12'),(11,'Thomas','Snakesamurai','sophie.lamant31@gmail.com',4,'Super',3,'2022-10-15 17:24:12'),(12,'Sophie','Lamant','sophie.lamant31@gmail.com',2,'nul',3,'2022-10-16 17:24:12'),(13,'Sophie','Lamant','sophie.lamant31@gmail.com',NULL,'comment ça marche, le site ?',1,'2022-10-18 17:24:12'),(14,'Coucou','Coucou','coucou',NULL,'coucou',1,'2022-10-19 17:24:53');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbackstypes`
--

DROP TABLE IF EXISTS `feedbackstypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbackstypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbackstypes`
--

LOCK TABLES `feedbackstypes` WRITE;
/*!40000 ALTER TABLE `feedbackstypes` DISABLE KEYS */;
INSERT INTO `feedbackstypes` VALUES (1,'question'),(2,'réclamation'),(3,'avis'),(4,'test');
/*!40000 ALTER TABLE `feedbackstypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'chaussures'),(2,'running'),(3,'natation'),(4,'randonnée'),(5,'yoga'),(6,'équitation');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'S'),(2,'M'),(3,'L'),(4,'XL'),(5,'XXL'),(6,'3XL'),(7,'XS'),(8,'28'),(9,'30'),(10,'32'),(11,'34'),(12,'36'),(13,'37'),(14,'38'),(15,'39'),(16,'40'),(17,'41'),(18,'42'),(19,'43'),(20,'44'),(21,'45'),(22,'46');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `targets`
--

DROP TABLE IF EXISTS `targets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `targets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `targets`
--

LOCK TABLES `targets` WRITE;
/*!40000 ALTER TABLE `targets` DISABLE KEYS */;
INSERT INTO `targets` VALUES (1,'femme'),(2,'homme'),(3,'enfant');
/*!40000 ALTER TABLE `targets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-20 23:29:36
