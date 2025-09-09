import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Holidays from "./pages/Holidays";
import HotelFlight from "./pages/HotelFlight";
import Cruise from "./pages/Cruise";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <>
     <Router>
     <Header/>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/hotel-flight" element={<HotelFlight />} />
        <Route path="/cruise" element={<Cruise />} />
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
