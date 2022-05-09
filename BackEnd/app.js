/*
	Date: May 8, 2022
		* Use Routes and MiddleWares.
*/ 

// Importing necessary files.
const errorMiddleWare = require("./MiddleWare/errors");
const express = require('express');
const app = express();

app.use(express.json());

// Importing all Routes
const productRoute = require('./Routes/productRoute');

// Using Routes.
app.use("/api/v1/", productRoute);

// Using MiddleWare
app.use(errorMiddleWare);

// Exporting express().
module.exports = app;