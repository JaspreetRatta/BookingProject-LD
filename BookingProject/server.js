const express = require("express");
const { readdirSync } = require('fs')
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser')
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const tourRoute = require("./routes/tourRoute");
const cloundinaryRoute = require("./routes/cloudinaryRoute.js");
const memoriesRoute = require("./routes/memoriesRoute");
const pin = require("./routes/pins");
const reviewRoute = require('./routes/reviewRoute')
const profileRoute = require('./routes/profile');

app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: "500mb" }))
app.use(express.json({
  limit: '50mb'
}));

// Route
app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/tour", tourRoute);
app.use('/api/memories', memoriesRoute);
app.use("/api/cloundinary", cloundinaryRoute)
app.use("/api/pins", pin);
app.use("/api/review", reviewRoute)
app.use("/api/profile", profileRoute)
app.use(express.json())


app.listen(port, () => {
  console.log('Server is running on port ' + port)
})

