const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const Seed = require("./db/seed");

require('dotenv').config();

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const driverRoutes = require("./routes/driver");
const vehicleRoutes = require("./routes/vehicle");
const bookingRoutes = require("./routes/booking");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/admins", adminRoutes);
app.use("/users", userRoutes);
app.use("/drivers", driverRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/bookings", bookingRoutes);

let seed = new Seed();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})