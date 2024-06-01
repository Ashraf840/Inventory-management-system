SHOW DATABASES;

USE inventory_mng_system;

SHOW TABLES;


-- Table: USER
-- Insert records: User
INSERT INTO `inventory_mng_system`.`user` (name, contactNumber, email, password, status, role)
VALUES ('admin', '123987198237', 'admin@gmail.com', '12345', 'true', 'admin');

SELECT * FROM `inventory_mng_system`.`user`;

-- Get all the staff users
SELECT id, name, contactNumber, email, password, status, role FROM `inventory_mng_system`.`user` WHERE role='staff';

-- Update Staff status from false to true or vice versa
UPDATE `inventory_mng_system`.`user` SET status=false WHERE id=4;



-- Table: measurement_unit
SELECT * FROM `inventory_mng_system`.`measurement_unit`;

INSERT INTO `inventory_mng_system`.`measurement_unit` (measurement_unit, abbreviation) VALUES ('Kilogram', 'kg');

DELETE FROM `inventory_mng_system`.`measurement_unit` WHERE id=1;
-- ALTER TABLE `inventory_mng_system`.`measurement_unit`
-- ADD COLUMN `abbreviation` VARCHAR(255);

-- DROP TABLE IF EXISTS `inventory_mng_system`.`measurement_unit`;


-- TABLE: product_category
SELECT * FROM `inventory_mng_system`.`product_category`;

INSERT INTO `inventory_mng_system`.`product_category` (category) VALUES ("cate-1");

INSERT INTO `inventory_mng_system`.`product_category` (category) VALUES ("cate-2");


-- TABLE: supplier
SELECT * FROM `inventory_mng_system`.`supplier`;

INSERT INTO `inventory_mng_system`.`supplier` (name, contact, email, address) VALUES ("supp-1", "98273498", "supp1@gmail.com", "supp-1 address");

INSERT INTO `inventory_mng_system`.`supplier` (name, contact, email) VALUES ("supp-2", "365234765", "supp2@gmail.com");

UPDATE `inventory_mng_system`.`supplier` SET name="supp-4", contact="2348729387", email="supp4@gmail.com", address="supp-4 address" WHERE id=5;


-- TABLE: product
SELECT * FROM `inventory_mng_system`.`product`;

INSERT INTO `inventory_mng_system`.`product` 
(name, category, supplier, cost_price, selling_price, minimum_stock, measurement_unit, reorder_stock_quantity) 
VALUES ("prod-1", 4, 6, 30.56, 40.23, 10, 5, 4);

INSERT INTO `inventory_mng_system`.`supplier` (name, contact, email) VALUES ("supp-2", "365234765", "supp2@gmail.com");

UPDATE `inventory_mng_system`.`supplier` SET name="supp-4", contact="2348729387", email="supp4@gmail.com", address="supp-4 address" WHERE id=5;


-- Check the record to parent tables for foreign key value integrity
SELECT * FROM `inventory_mng_system`.`product_category` WHERE `id` = 4;
SELECT * FROM `inventory_mng_system`.`supplier` WHERE `id` = 6;
SELECT * FROM `inventory_mng_system`.`measurement_unit` WHERE `id` = 5;