const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const Seed = require("./db/seed");

require('dotenv').config();

const collectorRoutes = require("./routes/collector");
const holderRoutes = require("./routes/holder");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const commonRoutes = require("./routes/common");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/collectors", collectorRoutes);
app.use("/holders", holderRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/common", commonRoutes);

let seed = new Seed();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})