import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Welcome from "./pages/Welcome";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/main" element={<Main/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
