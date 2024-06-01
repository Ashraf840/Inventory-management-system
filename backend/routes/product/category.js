const express = require('express');
const connection = require('../../connection');
const router = express.Router();
const auth = require('../../services/authentication');
const checkRole = require('../../services/checkRole');


router.get('/get', auth.authenticateToken, (req, res, next) => {
    let query = "SELECT * FROM inventory_mng_system.product_category";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});


router.post('/add', auth.authenticateToken, checkRole.AllowAdminOnly, (req, res, next) => {
    let cate = req.body;
    let query = "INSERT INTO inventory_mng_system.product_category (category) VALUES (?)";
    connection.query(query, [cate.category], (err, result) => {
        if (!err) {
            return res.status(201).json({ message: "New category created successfully!" });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.patch('/update', auth.authenticateToken, checkRole.AllowAdminOnly, (req, res, next) => {
    let cate = req.body;
    let query = "UPDATE inventory_mng_system.product_category SET category=? WHERE id=?";
    connection.query(query, [cate.category, cate.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Category id does not exist!" });
            }
            return res.status(202).json({ message: "Category updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.delete("/delete/:id", auth.authenticateToken, checkRole.AllowAdminOnly, (req, res, next) => {
    let id = req.params.id;
    let query = "DELETE FROM inventory_mng_system.product_category WHERE id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.sendStatus(204);
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;