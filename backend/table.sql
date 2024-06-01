CREATE SCHEMA `inventory_mng_system`;

CREATE TABLE `inventory_mng_system`.`user` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `contactNumber` VARCHAR(20),
    `email` VARCHAR(100),
    `password` VARCHAR(255),
    `status` VARCHAR(20),
    `role` VARCHAR(20),
    UNIQUE(`email`),
    PRIMARY KEY(`id`)
)

-- Insert records: User
INSERT INTO `inventory_mng_system`.`user` (name, contactNumber, email, password, status, role)
VALUES ('admin', '123987198237', 'admin@gmail.com', '12345', 'true', 'admin');

SELECT * FROM `inventory_mng_system`.`user`;