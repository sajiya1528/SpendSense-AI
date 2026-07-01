-- SpendSense AI Database Schema
CREATE DATABASE IF NOT EXISTS `spendsense_db`;
USE `spendsense_db`;

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS `income`;
DROP TABLE IF EXISTS `expenses`;
DROP TABLE IF EXISTS `users`;

-- Create users table
CREATE TABLE `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `profile_image` VARCHAR(255) DEFAULT NULL,
  `role` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create expenses table
CREATE TABLE `expenses` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `expense_date` DATE NOT NULL,
  `user_id` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_expense_user` (`user_id`),
  CONSTRAINT `FK_expense_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create income table
CREATE TABLE `income` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `source` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `income_date` DATE NOT NULL,
  `user_id` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_income_user` (`user_id`),
  CONSTRAINT `FK_income_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
