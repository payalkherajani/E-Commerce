const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error-handler.middleware');
require('dotenv').config();
const routeNotFound = require('./middleware/route-not-found.middleware');
const cors = require('cors')
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');
const categoryRoutes = require('./routes/category.route');
const wishlistRoutes = require('./routes/wishlist.route');
const addressRoutes = require('./routes/address.route')
const auth = require('./middleware/auth.middleware');

const app = express();
app.use(express.json()); //to accept req.body
app.use(cors());

connectDB()

//routes
app.use('/api/users', userRoutes);
app.use('/api/products', auth, productRoutes);
app.use('/api/carts', auth, cartRoutes);
app.use('/api/categories', auth, categoryRoutes);
app.use('/api/wishlists', auth, wishlistRoutes);
app.use('/api/address', auth, addressRoutes)

//This should not be moved
app.use(routeNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`)
})