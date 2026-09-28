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

test("Regression: exact challan search still works", async () => {
    const response = await request(app)
        .get("/api/challans/UP100538210925173627");

    assert.equal(response.statusCode, 200);
    assert.equal(
        response.body.challanNumber,
        "UP100538210925173627"
    );
});

test("Regression: invalid challan still returns 404", async () => {
    const response = await request(app)
        .get("/api/challans/INVALID123");

    assert.equal(response.statusCode, 404);
    assert.equal(
        response.body.message,
        "Challan not found"
    );
});

test("Regression: vehicle search still works", async () => {
    const response = await request(app)
        .get(
            "/api/challans/search?vehicleNumber=UP%2032%20LZ%202852"
        );

    assert.equal(response.statusCode, 200);
    assert.ok(response.body.count > 0);
    assert.ok(Array.isArray(response.body.results));
});

test("Regression: court search still works", async () => {
    const response = await request(app)
        .get(
            "/api/challans/search?court=ACJM%2027"
        );

    assert.equal(response.statusCode, 200);
    assert.ok(response.body.count > 0);
    assert.ok(Array.isArray(response.body.results));
});

test("Regression: combined search still works", async () => {
    const response = await request(app)
        .get(
            "/api/challans/search?vehicleNumber=UP%2032%20LZ%202852&court=ACJM%2027"
        );

    assert.equal(response.statusCode, 200);
    assert.ok(response.body.count > 0);
    assert.ok(Array.isArray(response.body.results));
});