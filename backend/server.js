const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/user.route');

const app = express();
app.use(express.json()); //to accept req.body

connectDB()

//routes
app.use('/api/user', userRoutes);

const PORT = 5000 || process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`)
})