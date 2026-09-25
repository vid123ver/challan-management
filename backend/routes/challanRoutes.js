const express = require("express");
const Challan = require("../models/Challan");

const router = express.Router();

// Search challans by vehicle number or court
router.get("/search", async (req, res) => {
    try {
        const { vehicleNumber, court } = req.query;

        const filter = {};

        if (vehicleNumber) {
            filter.vehicleNumber = {
                $regex: vehicleNumber,
                $options: "i"
            };
        }

        if (court) {
            filter.court = {
                $regex: court,
                $options: "i"
            };
        }

        const challans = await Challan.find(filter).limit(100);

        res.status(200).json({
            count: challans.length,
            results: challans
        });

    } catch (error) {
        console.error("Search error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// Get challan by challan number
router.get("/:challanNumber", async (req, res) => {
    try {
        const { challanNumber } = req.params;

        const challan = await Challan.findOne({
            challanNumber: challanNumber
        });

        if (!challan) {
            return res.status(404).json({
                message: "Challan not found"
            });
        }

        res.status(200).json(challan);

    } catch (error) {
        console.error("Error fetching challan:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;