const express = require('express');
const connection = require('../../connection');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const auth = require('../../services/authentication');
const checkRole = require('../../services/checkRole');

const router = express.Router();


// Admin & Staff Registration. Only Admin will have the privilege to register a staff
// TODO: Hash the password befor storing into the DB
router.post('/signup', (req, res) => {
    let user = req.body;
    let query = 'SELECT * FROM inventory_mng_system.user WHERE email=?';
    connection.query(query, [user.email], (err, result) => {
        if (!err) {
            // Check account duplicacy
            if (result.length <= 0) {
                query = "INSERT INTO inventory_mng_system.user (name, contactNumber, email, password, status, role) VALUES (?, ?, ?, ?, 'false', 'staff')";
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


// Admin & Staff login into the system
// TODO: Check against hashed password
router.post('/login', (req, res) => {
    let user = req.body;
    let query = "SELECT name, contactNumber, email, status, role, password from inventory_mng_system.user WHERE email=?";
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


// Allow: Admin Only
// Purpose: List all the staffs in admin dashboard. So the admin can change the "status"=true or "status"=false.
router.get('/get/staff', auth.authenticateToken, checkRole.AllowAdminOnly, (req, res) => {
    let query = "SELECT id, name, contactNumber, email, password, status, role FROM inventory_mng_system.user WHERE role='staff'";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});


// Allow: Admin only
router.patch('/update/staff', auth.authenticateToken, checkRole.AllowAdminOnly, (req, res) => {
    let user = req.body;
    let query = "UPDATE inventory_mng_system.user SET status=? WHERE id=?";
    connection.query(query, [user.status, user.id], (err, result) => {
        if (!err) {
            // console.log("result:", result);
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "User id does not exist!" });
            }
            return res.status(202).json({ message: "User updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;