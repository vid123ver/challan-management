import { useState } from "react";
import "./App.css";

function App() {
  const [challanNumber, setChallanNumber] = useState("");
  const [challan, setChallan] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchChallan = async () => {
    if (!challanNumber.trim()) {
      setMessage("Please enter a Challan Number");
      setChallan(null);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setChallan(null);

      const response = await fetch(
        `http://localhost:5005/api/challans/${challanNumber.trim()}`
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Challan not found");
        return;
      }

      setChallan(data);
    } catch (error) {
      setMessage("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Challan Management System</h1>

        <p className="subtitle">
          Search challan details using Challan Number
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter Challan Number"
            value={challanNumber}
            onChange={(e) => setChallanNumber(e.target.value)}
          />

          <button onClick={searchChallan}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {message && <p className="message">{message}</p>}

        {challan && (
          <div className="details">
            <h2>Challan Details</h2>

            <div className="detail-row">
              <strong>Challan Number:</strong>
              <span>{challan.challanNumber}</span>
            </div>

            <div className="detail-row">
              <strong>Vehicle Number:</strong>
              <span>{challan.vehicleNumber}</span>
            </div>

            <div className="detail-row">
              <strong>CNR:</strong>
              <span>{challan.cnr}</span>
            </div>

            <div className="detail-row">
              <strong>Next Date:</strong>
              <span>{challan.nextDate}</span>
            </div>

            <div className="detail-row">
              <strong>Court:</strong>
              <span>{challan.court}</span>
            </div>

            <div className="detail-row">
              <strong>Page Number:</strong>
              <span>{challan.pageNumber}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;