const test = require("node:test");
const assert = require("node:assert/strict");

const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config();

test.before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

test.after(async () => {
    await mongoose.connection.close();
});

test("GET valid challan should return challan details", async () => {
    const response = await request(app)
        .get("/api/challans/UP100538210925173627");

    assert.equal(response.statusCode, 200);
    assert.equal(
        response.body.challanNumber,
        "UP100538210925173627"
    );
    assert.equal(
        response.body.vehicleNumber,
        "UP 32 LZ 2852"
    );
});

test("GET invalid challan should return 404", async () => {
    const response = await request(app)
        .get("/api/challans/XXXXXXXX");

    assert.equal(response.statusCode, 404);
    assert.equal(
        response.body.message,
        "Challan not found"
    );
});