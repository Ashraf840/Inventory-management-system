const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user/user');
const measurementUnitRoute = require('./routes/product/measurement_unit');
const productCategoryRoute = require('./routes/product/category');
const supplierRoute = require('./routes/supplier/supplier');
const productRoute = require('./routes/product/product');

const app = express();
app.use(cors());

app.use(bodyParser.json());

// Endpoint routes
app.use('/user', userRoute);
app.use('/product/measurement-unit', measurementUnitRoute);
app.use('/product/category', productCategoryRoute);
app.use('/supplier', supplierRoute);
app.use('/product', productRoute);

module.exports = app;
