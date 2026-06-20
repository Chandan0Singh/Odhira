
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cart');
const user = require('./routes/user')
const blog = require("./routes/blogRoutes");
const order = require("./routes/orderRouter");

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', user);
app.use("/api/blog", blog);
app.use("/api/order", order);
app.use("/api/payment", require("./routes/paymentRoutes"));

app.get('/', (req, res) => {
  res.send('API running...');
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
  })
  .catch(err => console.error('❌ DB error:', err));
