const express = require('express');
const connection = require('../../connection');
const router = express.Router();
const auth = require('../../services/authentication');
const checkRole = require('../../services/checkRole');


router.get('/get', (req, res, next) => {
    let query = "SELECT * FROM inventory_mng_system.customer";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});


router.post('/add', (req, res, next) => {
    let cust = req.body;
    let email = cust.email ? cust.email : null;
    let address = cust.address ? cust.address : null;

    let query = "INSERT INTO inventory_mng_system.customer (name, contact, email, address) VALUES (?,?,?,?)";
    
    connection.query(query, [cust.name, cust.contact, email, address], (err, result) => {
        if (!err) {
            return res.status(201).json({ message: "New customer created successfully!" });
        } else {
            return res.status(500).json(err);
        }
    });
});


// Handle from the frontend, when updating a record from the frontend, fetch the previous values
// Even in the update form in the frontend, the 'address' field stays empty, then put null anyway.
router.patch('/update', (req, res, next) => {
    let cust = req.body;
    let email = cust.email ? cust.email : null;
    let address = cust.address ? cust.address : null;
    let query = "UPDATE inventory_mng_system.customer SET name=?, contact=?, email=?, address=? WHERE id=?";
    connection.query(query, [cust.name, cust.contact, email, address, cust.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Customer id does not exist!" });
            }
            return res.status(202).json({ message: "Customer updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.delete("/delete/:id", (req, res, next) => {
    let id = req.params.id;
    let query = "DELETE FROM inventory_mng_system.customer WHERE id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.sendStatus(204);
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;