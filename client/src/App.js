import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import LandingScreen from "./screens/LandingScreen";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/register" element={<Registerscreen />} />
                    <Route path="/login" element={<Loginscreen />} />
                    <Route path="/home" element={<HomeScreen />} />
                    <Route path="/book/:roomid/:frommonth/:tomonth" element={<BookingScreen />} />
                    <Route path="/" element={<LandingScreen />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;