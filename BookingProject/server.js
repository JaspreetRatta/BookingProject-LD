const express = require('express');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig.js');

const usersRoute = require('./routes/usersRoute.js');
const busesRoute = require('./routes/busesRoute.js');
const couponsRoute = require('./routes/couponsRoute.js');
const bookingsRoute = require('./routes/bookingsRoute.js');
const tourRoute = require('./routes/tourRoute.js');
const cloundinaryRoute = require('./routes/cloudinaryRoute.js');
const memoriesRoute = require('./routes/memoriesRoute.js');
const pin = require('./routes/pins.js');
const reviewRoute = require('./routes/reviewRoute.js');
const profileRoute = require('./routes/profile.js');

app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '500mb' }));
app.use(
  express.json({
    limit: '50mb',
  })
);

// Routes
app.use('/api/users', usersRoute);
app.use('/api/buses', busesRoute);
app.use('/api/coupons', couponsRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/tour', tourRoute);
app.use('/api/memories', memoriesRoute);
app.use('/api/cloundinary', cloundinaryRoute);
app.use('/api/pins', pin);
app.use('/api/review', reviewRoute);
app.use('/api/profile', profileRoute);

// Health check route (optional)
app.get('/', (req, res) => {
  res.send('Backend API is running ✅');
});

// Start server
const port = process.env.PORT || 5000;   // ✅ only once
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
