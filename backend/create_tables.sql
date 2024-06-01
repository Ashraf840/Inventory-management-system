-- Create Database (Schema/Database)
CREATE SCHEMA IF NOT EXISTS `inventory_mng_system`;

-- Table: user
CREATE TABLE IF NOT EXISTS `inventory_mng_system`.`user` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `contactNumber` VARCHAR(20),
    `email` VARCHAR(100),
    `password` VARCHAR(255),
    `status` VARCHAR(20),
    `role` VARCHAR(20),
    UNIQUE(`email`),
    PRIMARY KEY(`id`)
);

--  Table: measurement_unit
CREATE TABLE IF NOT EXISTS `inventory_mng_system`.`measurement_unit` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `measurement_unit` VARCHAR(100) NOT NULL,
    `abbreviation` VARCHAR(20),
    UNIQUE(`measurement_unit`),
    PRIMARY KEY (`id`)
);

-- ALTER TABLE `inventory_mng_system`.`measurement_unit`
-- MODIFY COLUMN `measurement_unit` VARCHAR(100) NOT NULL;

-- UPDATE
-- ALTER TABLE `inventory_mng_system`.`measurement_unit` ADD COLUMN `abbreviation` VARCHAR(255);
-- DELETE
-- DROP TABLE IF EXISTS `inventory_mng_system`.`measurement_unit`;


--  Table: product_category
CREATE TABLE IF NOT EXISTS `inventory_mng_system`.`product_category` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(255) NOT NULL,
    UNIQUE(`category`),
    PRIMARY KEY (`id`)
);

-- ALTER TABLE `inventory_mng_system`.`product_category`
-- MODIFY COLUMN `category` VARCHAR(255) NOT NULL;


--  Table: supplier
CREATE TABLE IF NOT EXISTS `inventory_mng_system`.`supplier` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `contact` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255),
    UNIQUE(`email`),
    PRIMARY KEY (`id`)
);