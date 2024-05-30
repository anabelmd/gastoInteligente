-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: gastos_personales
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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Ana','ere2sf452','ana@gmail.com'),(3,'Antonio','abcdef123','antonio@gmal.es'),(4,'María','asfasf','maria@gmail.com'),(5,'Manoli','asdfsf','manoli@gmail.com'),(6,'Daniel','123456','dani@gmail.com'),(7,'UsuarioPrueba','2242424','prueba@gmail.com'),(8,'','2242424','prueba@gmail.com'),(9,'','2242424','prueba@gmail.com'),(10,'Anabel','123433','prueba@gmail.com'),(11,'sdf','sdf','prueba2@gmail.com'),(12,'asd','asd','daniel@gmail.com'),(13,'sdf','sdf','prueba3@gmail.com'),(14,'sdf','dd','holi@gmail.com'),(15,'sdf','sdf','otraPrueba@gmail.com'),(16,'sdf','sdf','pruebi@gmail.com'),(17,'Francisco','sdsdfsdfs','francisco@gmail.com'),(18,'Lolita','$2a$10$ZW6BIsA711A6tawa8b17/ugK1F1Z64NKBlFWi1HMGjv95s.E2IZDy','loli@gmail.com'),(19,'Amadeo','$2a$10$ajSiySMh11l22Kr83dkPUO60G8p43m1E82Dzo2XJ9xiCza.tI20u.','amadeo@gmail.com'),(20,'Anabelita','$2a$10$o5rr2EAxzaB2oz8953OypOlnsWQC2HQfFgsyJr4wSmJ7JoGAYltwu','anabelita@gmail.com'),(21,'Anabelita','$2a$10$bGrXoaT3RkzvwQfx2L6nUulgrZEyKRr8LOgMWtsPAODGk9yGBUSs2','anais@gmail.com'),(22,'asdfsdaf','$2a$10$s6LZA.KyCMiHA3586.yrBeFt/dDLUng6ce2P/tAZMPxhS1GLjs/Ka','asfdasf@gmail.com'),(23,'asdfsdaf','$2a$10$GVdkyMGvYHZXGXeSLfwwOuD9Jp9qfPKGz..FM8Dy8Jfxw/u9SkRVu','perez@gmail.com'),(24,'asdfsdaf','$2a$10$OOaWTCfWC4UiuU1OJCIcSur7tN0JNmL6U.TDeYDkq4JQLPXvDeMxi','prueba123456789@gmail.com'),(25,'pablo','$2a$10$81UTBRtIi6gFsdOg6AJUFON62URXg.r8Q41wX1u28mn5XqYnSO/Vy','pablo12344@gmail.com'),(26,'pablo','$2a$10$UW6R0vfd1E7gPgq7wzjcd.vbHH0RkE0M142JGQxBU9JIbQe6duo5e','pablo23432@gmail.com'),(27,'pablo','$2a$10$qJrr1fGpn9GL1mCsbr2Yn.rxoMi4q.XLTzFeU6c3h8cbI0bmbw5OW','polllo12340897423@gmail.com'),(28,'paodfñkal','$2a$10$DUthS8YYEYk0di7KFpNzTe2lvWXoxZ9sJTw54WD9mMR4aLb.J6EHe','kashgdfjkhasgdfjk@gmail.com'),(29,'paodfñkal','$2a$10$ydhu1LHVpxl/7coPseMBN.1IGfjnN/xqAdjpEfC9lKEwpbcdKxXn.','kashgdfjkhasgdfsjk@gmail.com'),(30,'paodfñkal','$2a$10$kjMncnFW8XjBdmvl22Yjge3QQJPq8KoepZy4PQYMNa.aiqWQMQREi','kashgdfjkhassssgdfsjk@gmail.com'),(32,'paodfñkal','$2a$10$BiWIS3H7o10Yg8KKksuwAeSNE4b4DSKJUogr.vhN/65YOYvpx0apW','kashgdfjkhasdsssgdfsjk@gmail.com'),(33,'anabelmondi','$2a$10$JW68oO86b5qJYuBRIKhOIeiHh.SU0h8NJUF2tkjMgMEb/lpGMgxGO','anabelmondi@gmail.com'),(34,'Pablo','$2a$10$7t8zWBZyC2oippfx5Y2sOeHzOrHRWDPwg.hQV7mR9WU0jCfwDcwjy','pabloprueba@gmail.com'),(35,'anaissss','$2a$10$W8VjwYM5bHgwSF5RtwzeROjdXHDLZHAkPeMpR0.hwSJFoOS9dsxpC','anaisa@gmail.com'),(36,'anais2','$2a$10$tEFfemiffSJ9rqKD8lbhiegOIzOZBMRjl1kyEwTATHc0zBT4cGXcG','anais2@gmail.com'),(37,'Amapola','$2a$10$kZ0U8SExJyNyzI8Qx7FAeO2DxCyNPCQERFop7IdFT.3uJjzEulx4i','amapola@gmail.com'),(38,'Francisco','$2a$10$Wpnhx7OvVTHT7CmOPKKkmOR3RxM1z6s5zbjoKC0WbrRaE0vbdHmCS','franciscom@gmail.com'),(39,'Pilar','$2a$10$WUaBMypxD1HsmJfWIU6/werodfhjMKsbi1cnVVDdXucMt72h1/dfC','pilar@gmail.com');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-27 16:38:54
