# Challan Management System

A full-stack web application to manage and search motor vehicle challan records from a PDF.

The project extracts challan data, validates it, stores it in MongoDB, and provides APIs and a React frontend for searching challan details.

## Features

- Extract and validate challan data from PDF
- Store data in MongoDB
- Search by Challan Number
- Search by Vehicle Number and Court
- View complete challan details
- REST API using Node.js and Express.js
- React frontend
- Unit, Integration and Regression Testing

---

## Technology Stack

### Frontend

- React.js
- Vite
- CSS

### Backend

- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database

- MongoDB Atlas

### Data Processing

- Python
- PyMuPDF

### Testing

- Vitest
- React Testing Library
- Node.js Test Runner
- Supertest

---

## Project Structure

```text
challan-management/
│
├── data/
│   ├── input/
│   │   └── TOTAL CHALLANS LIST LOK ADALAT.pdf
│   │
│   └── output/
│       └── challans.json
│
├── extraction/
│   ├── test_pdf.py
│   ├── extract_challans.py
│   ├── validate_challans.py
│   └── inspect_vehicle_warnings.py
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   └── Challan.js
│   │
│   ├── routes/
│   │   └── challanRoutes.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── importData.js
│   ├── integration.test.js
│   ├── regression.test.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── App.test.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── setupTests.js
│   │
│   ├── vitest.config.js
│   └── package.json
│
├── README.md
└── .gitignore