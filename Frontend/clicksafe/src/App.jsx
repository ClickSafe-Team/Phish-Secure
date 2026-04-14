import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="app-container">
        {currentPage === "home" && <Home />}
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "about" && <About />}
      </div>
    </>
  );
}

export default App;
