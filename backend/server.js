const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error-handler.middleware');
require('dotenv').config();
const routeNotFound = require('./middleware/route-not-found.middleware');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');
const categoryRoutes = require('./routes/category.route');

const app = express();
app.use(express.json()); //to accept req.body

connectDB()

//routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/categories', categoryRoutes);

//This should not be moved
app.use(routeNotFound);
app.use(errorHandler);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`)
})