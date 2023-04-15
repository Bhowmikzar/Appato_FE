import "./App.css";
import React from "react";
import campaigns from "./json/campaigns.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Campaigns from "./pages/campaigns";
import FolderStructure from "./components/FolderStructure";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Router>
          <div>
            <FolderStructure />
          </div>
          <div style={{ width: "100%" }}>
            {" "}
            <h4 className="Recent"> Recent Campaigns</h4>
            <div style={{ width: "90%", margin: "auto" }}>
              <Routes>
                <Route path="/test" element={<Campaigns items={campaigns} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
