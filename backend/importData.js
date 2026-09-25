const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const Challan = require("./models/Challan");

dotenv.config();

const importData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        // Check existing records first
        const existingCount = await Challan.countDocuments();

        console.log(`Existing challans in database: ${existingCount}`);

        // Safety check
        if (existingCount > 0) {
            console.log(
                "Import stopped: challans collection already contains data."
            );
            await mongoose.connection.close();
            return;
        }

        // JSON file location
        const filePath = path.join(
            __dirname,
            "../data/output/challans.json"
        );

        // Read JSON file
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        console.log(`Total records in JSON: ${data.length}`);

        // Import in batches
        const batchSize = 5000;

        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);

            await Challan.insertMany(batch);

            console.log(
                `Imported ${Math.min(i + batchSize, data.length)} / ${data.length}`
            );
        }

        // Final verification
        const finalCount = await Challan.countDocuments();

        console.log("--------------------------------");
        console.log(`Final MongoDB count: ${finalCount}`);
        console.log("--------------------------------");

        await mongoose.connection.close();

        console.log("MongoDB connection closed");
        console.log("Import completed successfully!");
    } catch (error) {
        console.error("Import failed:");
        console.error(error.message);

        await mongoose.connection.close();
        process.exit(1);
    }
};

importData();