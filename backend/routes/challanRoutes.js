const express = require("express");
const Challan = require("../models/Challan");

const router = express.Router();

// Get challan by challan number
router.get("/:challanNumber", async (req, res) => {
    try {
        const { challanNumber } = req.params;

        const challan = await Challan.findOne({
            challanNumber: challanNumber
        });

        // Challan not found
        if (!challan) {
            return res.status(404).json({
                message: "Challan not found"
            });
        }

        // Challan found
        res.status(200).json(challan);

    } catch (error) {
        console.error("Error fetching challan:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;