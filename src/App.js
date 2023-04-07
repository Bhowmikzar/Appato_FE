import "./App.css";

import Navigation from "./components/nestedMenu";
import items from "./Folder-structure";
import campaigns from "./json/campaigns.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Campaigns from "./pages/campaigns";

function App() {
  return (
    <div className="App">
      <h4 className="Recent"> Recent Campaigns</h4>
      <Router>
        <Navigation items={items} />
        <div style={{ marginLeft: 270 }}>
          <Routes>
            <Route path="/test" element={<Campaigns items={campaigns} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
