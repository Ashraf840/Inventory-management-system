const express = require('express');
const connection = require('../../connection');
const router = express.Router();
const auth = require('../../services/authentication');
const checkRole = require('../../services/checkRole');


router.get('/get', (req, res, next) => {
    let query = "SELECT * FROM inventory_mng_system.measurement_unit";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});


router.get('/get/:id', (req, res, next) => {
    let id = req.params.id;
    let query = "SELECT * FROM inventory_mng_system.measurement_unit WHERE id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});


router.post('/add', (req, res, next) => {
    let m_unit = req.body;
    let abbreviation = m_unit.abbreviation ? m_unit.abbreviation : null;
    let query = "INSERT INTO inventory_mng_system.measurement_unit (measurement_unit, abbreviation) VALUES (?, ?)";
    connection.query(query, [m_unit.measurement_unit, abbreviation], (err, result) => {
        if (!err) {
            return res.status(201).json({ message: "Measure unit created successfully!" });
        } else {
            return res.status(500).json(err);
        }
    });
});


// Handle from the frontend
// Even in the update form in the frontend, the 'abbreviation' field stays empty, then put null anyway.
router.patch('/update', (req, res, next) => {
    let m_unit = req.body;
    let abbreviation = m_unit.abbreviation ? m_unit.abbreviation : null;
    let query = "UPDATE inventory_mng_system.measurement_unit SET measurement_unit=?, abbreviation=? WHERE id=?";
    connection.query(query, [m_unit.measurement_unit, abbreviation, m_unit.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Measurement unit id does not exist!" });
            }
            return res.status(202).json({ message: "Measurement unit updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.delete("/delete/:id", (req, res, next) => {
    let id = req.params.id;
    let query = "DELETE FROM inventory_mng_system.measurement_unit WHERE id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.sendStatus(204);
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;