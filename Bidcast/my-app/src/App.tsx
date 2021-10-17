import React from "react";
import "./App.scss";
import "./pages/createbids/CreateBids.scss"
// import LiveStream from "./LiveStream";
import { CreateBids } from "./pages/createbids/CreateBids";

function App() {
    return (
        <div className="App">
            <CreateBids></CreateBids>
        </div>
    );
}

export default App;
