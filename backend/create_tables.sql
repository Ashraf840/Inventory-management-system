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


--  Table: product
CREATE TABLE IF NOT EXISTS `inventory_mng_system`.`product` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `category` INT,
    `supplier` INT,
    `cost_price` FLOAT NOT NULL,
    `selling_price` FLOAT NOT NULL,
    `minimum_stock` INT NOT NULL,
    `measurement_unit` INT,
    `reorder_stock_quantity` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_category`
        FOREIGN KEY (`category`)
        REFERENCES `product_category` (`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CONSTRAINT `fk_supplier`
        FOREIGN KEY (`supplier`)
        REFERENCES `supplier` (`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CONSTRAINT `fk_measurement_unit`
        FOREIGN KEY (`measurement_unit`)
        REFERENCES `measurement_unit` (`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
