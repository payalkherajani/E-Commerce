const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB()

const PORT = 5000 || process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`)
})