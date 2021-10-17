import React from "react";
import "react-custom-scroll/dist/customScroll.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.scss";
import LiveStream from "./pages/LiveStream/LiveStream";
import { Link, Route, Switch } from "react-router-dom";
import { Login } from "./pages/Login";
import { HomePageNavbar } from "./pages/homepage/Navbar";
import { Footer } from "./pages/homepage/Footer";

function App() {
    return (
        <div className="App">
            <HomePageNavbar />
            <LiveStream />
            <Footer />
        </div>
    );
}

export default App;
