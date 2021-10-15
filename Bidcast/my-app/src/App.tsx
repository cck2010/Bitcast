import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.scss";
import LiveStream from "./pages/LiveStream/LiveStream";
import { Link, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login'; 

function App() {
    return (
        <div className="App">
            <LiveStream></LiveStream>
        </div>
    );
}

export default App;
