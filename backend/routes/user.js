const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.post('/signup', (req, res) => {
    let user = req.body;
    query = 'SELECT * FROM inventory_mng_system.user WHERE email=?';
    connection.query(query, [user.email], (err, result) => {
        if (!err) {
            // Check account duplicacy
            if (result.length <= 0) {
                query = "INSERT INTO inventory_mng_system.user (name, contactNumber, email, password, status, role) VALUES (?, ?, ?, ?, 'false', 'user')";
                connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, result) => {
                    if (!err) {
                        return res.status(201).json({ message: "User created successfully!" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(400).json({ message: 'Email already exist!' });
            }
        } else {

        }
    });
});


router.post('/login', (req, res) => {
    let user = req.body;
    query = "SELECT name, contactNumber, email, status, role from inventory_mng_system.user WHERE email=?";
    connection.query(query, [user.email], (err, result) => {
        console.log("query result", result);
        if (!err) {

        } else {
            return res.status()
        }
    });
});


module.exports = router;