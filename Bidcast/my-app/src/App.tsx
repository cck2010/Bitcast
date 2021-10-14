import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.scss";
import LiveStream from "./pages/LiveStream/LiveStream";

function App() {
    return (
        <div className="App">
            <LiveStream></LiveStream>
        </div>
    );
}

export default App;
