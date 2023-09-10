-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for donate
CREATE DATABASE IF NOT EXISTS `donate` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `donate`;

-- Dumping structure for table donate.donates
CREATE TABLE IF NOT EXISTS `donates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `streamer` varchar(50) DEFAULT NULL,
  `donator` varchar(50) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `descs` varchar(50) DEFAULT NULL,
  `date` date DEFAULT curdate(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table donate.donates: ~0 rows (approximately)
INSERT INTO `donates` (`id`, `streamer`, `donator`, `price`, `descs`, `date`) VALUES
	(1, 'KiaN', 'Jafar', '23', 'Baraye Del Khoshi', '2023-09-10'),
	(2, 'KiaN', 'Jafar', '23', 'Baraye Del Khoshi', '2023-09-10'),
	(3, 'KiaN', 'Jafar', '23', 'Baraye Del Khoshi', '2023-09-10'),
	(4, 'KiaN', 'Jafar', '5000', 'Baraye Del Khoshi', '2023-09-10'),
	(5, 'KiaN', 'Jafar', '5000', 'Baraye Del Khoshi', '2023-09-10'),
	(6, 'KiaN', 'Jafar', '5000', 'Baraye Del Khoshi', '2023-09-10'),
	(7, 'KiaN', 'Jafar', '50000', 'Baraye Del Khoshi', '2023-09-10'),
	(8, 'KiaN', 'Asghar', '24244', 'SADsadas dsad asD ', '2023-09-10'),
	(9, 'KiaN', 'Asghar', '24244', 'SADsadas dsad asD ', '2023-09-10'),
	(10, 'KiaN', 'Asghar', '24244', 'SADsadas dsad asD ', '2023-09-10'),
	(11, 'KiaN', 'Asghar', '24244', 'SADsadas dsad asD ', '2023-09-10'),
	(12, 'KiaN', 'Asghar', '24244', 'SADsadas dsad asD ', '2023-09-10'),
	(13, 'KiaN', 'Asghar', '24244', 'SADsadas dsad asD ', '2023-09-10'),
	(14, 'KiaN', 'Asghar', '24244', 'SADsadas dsad asD ', '2023-09-10'),
	(15, 'KiaN', 'Asghar', '24244', 'SADsadas dsad asD ', '2023-09-10');

-- Dumping structure for table donate.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `link` varchar(50) DEFAULT NULL,
  `plan` varchar(50) DEFAULT NULL,
  `date` date NOT NULL DEFAULT curdate(),
  `alertlink` varchar(50) DEFAULT NULL,
  `goallink` varchar(50) DEFAULT NULL,
  `goaltitle` varchar(50) DEFAULT NULL,
  `goalmoney` int(11) DEFAULT NULL,
  `goalmaxmoney` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table donate.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `link`, `plan`, `date`, `alertlink`, `goallink`, `goaltitle`, `goalmoney`, `goalmaxmoney`) VALUES
	(1, 'KiaN', 'kian.rabiei1387@gmail.com', 'kian', '29', '2023-09-07', 'ASOIDHJjhkdash', 'ISUADGhjgdasjhdgsajhg', 'تست', 248952, 250000);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
