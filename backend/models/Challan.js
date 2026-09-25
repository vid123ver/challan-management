const mongoose = require("mongoose");

const challanSchema = new mongoose.Schema(
    {
        serialNumber: {
            type: Number,
            required: true
        },

        challanNumber: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        vehicleNumber: {
            type: String,
            required: true
        },

        cnr: {
            type: String,
            required: true
        },

        nextDate: {
            type: String,
            required: true
        },

        court: {
            type: String,
            required: true
        },

        pageNumber: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Challan", challanSchema);