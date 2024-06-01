const express = require('express');
const connection = require('../connection');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

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
    query = "SELECT name, contactNumber, email, status, role, password from inventory_mng_system.user WHERE email=?";
    connection.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].password !== user.password) {
                return res.status(401).json({ message: "Incorrect email or password" });
            } 
            else if (result[0].status === "false") {
                return res.status(401).json({ message: "Wait for admin approval" });
            } 
            else if (result[0].password === user.password) {
                const response = { email: result[0].email, role: result[0].role };
                const accessToken = jwt.sign(response, config.ACCESS_TOKEN, { expiresIn: '8h' });
                return res.status(200).json({ toen: accessToken });
            } 
            else {
                return res.status(401).json({ message: "Somethign went wrong. Please try again later." });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;