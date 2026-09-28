const express = require("express");
const cors = require("cors");

const challanRoutes = require("./routes/challanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Challan Management API is running"
    });
});

app.use("/api/challans", challanRoutes);

module.exports = app;