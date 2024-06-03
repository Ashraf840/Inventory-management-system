const express = require('express');
const connection = require('../../connection');
const router = express.Router();
const auth = require('../../services/authentication');
const checkRole = require('../../services/checkRole');


router.get('/get', (req, res, next) => {
    // let query = "SELECT * FROM inventory_mng_system.product";
    let query = `SELECT 
                    p.id,
                    p.name,
                    c.category,
                    s.name AS supplier_name,
                    p.cost_price,
                    p.selling_price,
                    p.minimum_stock,
                    mu.measurement_unit,
                    p.reorder_stock_quantity
                FROM 
                    inventory_mng_system.product p
                LEFT JOIN 
                    product_category c ON p.category = c.id
                LEFT JOIN 
                    inventory_mng_system.supplier s ON p.supplier = s.id
                LEFT JOIN 
                    measurement_unit mu ON p.measurement_unit = mu.id`;
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});


router.post('/add', (req, res, next) => {
    let prod = req.body;
    let category = prod.category ? prod.category : null;
    let supplier = prod.supplier ? prod.supplier : null;
    let measurement_unit = prod.measurement_unit ? prod.measurement_unit : null;

    let query = "INSERT INTO inventory_mng_system.product (name, category, supplier, cost_price, selling_price, minimum_stock, measurement_unit, reorder_stock_quantity) VALUES (?,?,?,?,?,?,?,?)";
    
    connection.query(query, 
        [prod.name, category, supplier, prod.cost_price, prod.selling_price, prod.minimum_stock, measurement_unit, prod.reorder_stock_quantity], 
        (err, result) => {
        if (!err) {
            return res.status(201).json({ message: "New product created successfully!" });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.patch('/update', (req, res, next) => {
    let prod = req.body;
    let category = prod.category ? prod.category : null;
    let supplier = prod.supplier ? prod.supplier : null;
    let measurement_unit = prod.measurement_unit ? prod.measurement_unit : null;

    let query = "UPDATE inventory_mng_system.product SET name=?, category=?, supplier=?, cost_price=?, selling_price=?, minimum_stock=?, measurement_unit=?, reorder_stock_quantity=? WHERE id=?";
    
    connection.query(query, 
        [prod.name, category, supplier, prod.cost_price, prod.selling_price, prod.minimum_stock, measurement_unit, prod.reorder_stock_quantity, prod.id], 
        (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not exist!" });
            }
            return res.status(202).json({ message: "Product updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.delete("/delete/:id", (req, res, next) => {
    let id = req.params.id;
    let query = "DELETE FROM inventory_mng_system.product WHERE id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.sendStatus(204);
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;