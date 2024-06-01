const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');


router.get('/', auth.authenticateToken, (req, res, next) => {
    var productCount;
    var supplierCount;

    // Product
    let prodCount_query = "SELECT COUNT(*) AS productCount FROM inventory_mng_system.product";
    connection.query(prodCount_query, (err, result) => {
        if (!err) {
            productCount = result[0].productCount;
        } else {
            return res.status(500).json(err);
        }
    });

    // Supplier
    let suppCount_query = "SELECT COUNT(*) AS supplierCount FROM inventory_mng_system.supplier";
    connection.query(suppCount_query, (err, result) => {
        if (!err) {
            supplierCount = result[0].supplierCount;
            let data = {
                productQnt: productCount,
                supplierQnt: supplierCount,
            };
            return res.status(200).json(data);
        } else {
            return res.status(500).json(err);
        }
    });


});


module.exports = router;