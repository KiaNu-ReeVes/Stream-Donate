-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
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

-- Dumping data for table donate.donates: ~15 rows (approximately)
INSERT INTO `donates` (`id`, `streamer`, `donator`, `price`, `descs`, `date`) VALUES
	(1, 'KiaN', 'Amir', '25000', 'Arbab Raftam Biron Omadam Khone', '2023-09-10'),
	(2, 'KiaN', 'Amir', '25000', 'Arbab Raftam Biron Omadam Khone', '2023-09-10'),
	(3, 'KiaN', 'Asghar', '23233', 'Arbab Raftam Biron Omadam Khone', '2023-09-12'),
	(4, 'KiaN', 'Asghar', '23233', 'Arbab Raftam Biron Omadam Khone', '2023-09-12'),
	(5, 'KiaN', 'Asghar', '23233', 'Arbab Raftam Biron Omadam Khone', '2023-09-12'),
	(6, 'KiaN', 'Asghar', '23233', 'Arbab Raftam Biron Omadam Khone', '2023-09-12'),
	(7, 'KiaN', 'Amir', '250000', 'Arbab Raftam Biron Omadam Khone', '2023-09-16'),
	(8, 'KiaN', 'Amir', '25000', 'سلام خوبی من رفتم بیرون ! ', '2023-09-18'),
	(9, 'KiaN', 'Amir', '25000', 'سلام خوبی من رفتم بیرون ! ', '2023-09-18'),
	(10, 'KiaN', 'Amir', '25000', 'سلام خوبی من رفتم بیرون ! ', '2023-09-18'),
	(11, 'KiaN', 'Amir', '25000', 'سلام خوبی من رفتم بیرون ! ', '2023-09-18'),
	(12, 'KiaN', 'Amir', '25000', 'سلام خوبی من رفتم بیرون ! ', '2023-09-18'),
	(13, 'KiaN', 'Amir', '25000', 'سلام خوبی من رفتم بیرون ! ', '2023-09-18'),
	(14, 'KiaN', 'Amir', '25000', 'سلام خوبی من رفتم بیرون ! ', '2023-09-18'),
	(15, 'KiaN', 'Amir', '50000', 'سلام خوبی من رفتم بیرون ! ', '2023-09-18');

-- Dumping structure for table donate.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `link` varchar(50) DEFAULT NULL,
  `plan` date DEFAULT curdate(),
  `date` date NOT NULL DEFAULT curdate(),
  `alertlink` varchar(50) DEFAULT NULL,
  `lastdonolink` varchar(50) DEFAULT NULL,
  `goallink` varchar(50) DEFAULT NULL,
  `goaltitle` varchar(50) NOT NULL DEFAULT 'تست',
  `goalmoney` int(11) NOT NULL DEFAULT 0,
  `goalmaxmoney` int(11) NOT NULL DEFAULT 50000,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table donate.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `email`, `phone_number`, `password`, `link`, `plan`, `date`, `alertlink`, `lastdonolink`, `goallink`, `goaltitle`, `goalmoney`, `goalmaxmoney`) VALUES
	(1, 'Kian', 'Rabiei', 'KiaN', 'kian.rabiei1387@gmail.com', '09369377701', 'KiaN1387', 'KiaN', '2023-10-18', '2023-09-18', 'AevS48O3XA9s35dqIHPlN397ffi13ca4n4KYZHyfFUWNaHUVEH', 'GwVZs1GjU9lk3qzCYAxV7uc3P6n0EMvvodMtvQVeE30VeAkBTK', 'FvQJtwW1ZdrmQdZC750jdcp1M43SOGxRey6s4kOg8xSt204RRQ', 'تست', 225000, 50000);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
