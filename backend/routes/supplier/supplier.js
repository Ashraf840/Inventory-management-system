const express = require('express');
const connection = require('../../connection');
const router = express.Router();
const auth = require('../../services/authentication');
const checkRole = require('../../services/checkRole');


router.get('/get', auth.authenticateToken, (req, res, next) => {
    let query = "SELECT * FROM inventory_mng_system.supplier";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});


router.post('/add', auth.authenticateToken, checkRole.AllowAdminOnly, (req, res, next) => {
    let supp = req.body;
    let address = supp.address ? supp.address : null;
    let query = "INSERT INTO inventory_mng_system.supplier (name, contact, email, address) VALUES (?,?,?,?)";
    connection.query(query, [supp.name, supp.contact, supp.email, address], (err, result) => {
        if (!err) {
            return res.status(201).json({ message: "New supplier created successfully!" });
        } else {
            return res.status(500).json(err);
        }
    });
});


// Handle from the frontend, when updating a record from the frontend, fetch the previous values
// Even in the update form in the frontend, the 'address' field stays empty, then put null anyway.
router.patch('/update', auth.authenticateToken, checkRole.AllowAdminOnly, (req, res, next) => {
    let supp = req.body;
    let address = supp.address ? supp.address : null;
    let query = "UPDATE inventory_mng_system.supplier SET name=?, contact=?, email=?, address=? WHERE id=?";
    connection.query(query, [supp.name, supp.contact, supp.email, address, supp.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Supplier id does not exist!" });
            }
            return res.status(202).json({ message: "Supplier updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.delete("/delete/:id", auth.authenticateToken, checkRole.AllowAdminOnly, (req, res, next) => {
    let id = req.params.id;
    let query = "DELETE FROM inventory_mng_system.supplier WHERE id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.sendStatus(204);
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;