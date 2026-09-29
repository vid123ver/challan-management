import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchType, setSearchType] = useState("challan");
  const [challanNumber, setChallanNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [court, setCourt] = useState("");

  const [challan, setChallan] = useState(null);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchChallan = async () => {
    setMessage("");
    setChallan(null);
    setResults([]);

    if (
      (searchType === "challan" && !challanNumber.trim()) ||
      (searchType === "vehicle" && !vehicleNumber.trim()) ||
      (searchType === "court" && !court.trim())
    ) {
      setMessage("Please enter the required details");
      return;
    }

    try {
      setLoading(true);

      let url = "";

      if (searchType === "challan") {
        url = `http://localhost:5005/api/challans/${challanNumber.trim()}`;
      } else {
        const params = new URLSearchParams();

        if (searchType === "vehicle") {
          params.append("vehicleNumber", vehicleNumber.trim());
        }

        if (searchType === "court") {
          params.append("court", court.trim());
        }

        url = `http://localhost:5005/api/challans/search?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "No results found");
        return;
      }

      if (searchType === "challan") {
        setChallan(data);
      } else {
        if (data.results.length === 0) {
          setMessage("No challans found");
        } else {
          setResults(data.results);
        }
      }
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
          Search challan details
        </p>

        <div className="search-type">
          <label>Search By</label>

          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setMessage("");
              setChallan(null);
              setResults([]);
            }}
          >
            <option value="challan">Challan Number</option>
            <option value="vehicle">Vehicle Number</option>
            <option value="court">Court</option>
          </select>
        </div>

        <div className="search-box">
          {searchType === "challan" && (
            <input
              type="text"
              placeholder="Enter Challan Number"
              value={challanNumber}
              onChange={(e) => setChallanNumber(e.target.value)}
            />
          )}

          {searchType === "vehicle" && (
            <input
              type="text"
              placeholder="Enter Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          )}

          {searchType === "court" && (
            <input
              type="text"
              placeholder="Enter Court"
              value={court}
              onChange={(e) => setCourt(e.target.value)}
            />
          )}

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

        {results.length > 0 && (
          <div className="results">
            <h2>Search Results ({results.length})</h2>

            {results.map((item) => (
              <div className="result-card" key={item._id}>
                <div className="detail-row">
                  <strong>Challan Number:</strong>
                  <span>{item.challanNumber}</span>
                </div>

                <div className="detail-row">
                  <strong>Vehicle Number:</strong>
                  <span>{item.vehicleNumber}</span>
                </div>

                <div className="detail-row">
                  <strong>CNR:</strong>
                  <span>{item.cnr}</span>
                </div>

                <div className="detail-row">
                  <strong>Next Date:</strong>
                  <span>{item.nextDate}</span>
                </div>

                <div className="detail-row">
                  <strong>Court:</strong>
                  <span>{item.court}</span>
                </div>

                <div className="detail-row">
                  <strong>Page Number:</strong>
                  <span>{item.pageNumber}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;