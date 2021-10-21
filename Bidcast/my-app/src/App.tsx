import React from "react";
import "react-custom-scroll/dist/customScroll.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.scss";
import LiveStream from "./pages/LiveStream/LiveStream";
import { Link, Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { HomePageNavbar } from "./pages/homepage/Navbar";
import { Footer } from "./pages/homepage/Footer";
import { CreateBids } from "./pages/createbids/CreateBids";
import LiveStreamSeller from "./pages/LiveStream/LiveStreamSeller";
import { Homepage } from "./pages/homepage/Homepage";
import { profile } from "console";
import { ProfilePage } from "./pages/Profile-Page/Profilepage";
import { CategoryResults } from "./pages/categories/Categories";
// import { CreateBids } from "./pages/createbids/CreateBids";

function App() {
  return (
    <div className="App">
      <HomePageNavbar />
      {/* <LiveStream /> */}
      {/* <CreateBids /> */}
      <Switch>
        {/* <Route path="/" ><Homepage /></Route> */}
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/createBids">
          <CreateBids />
        </Route>
        <Route path="/liveStreaming">
          <LiveStream />
        </Route>
        <Route path="/liveStreamingSeller">
          <LiveStreamSeller />
        </Route>
        <Route path="/categoryResult">
          <CategoryResults />
        </Route>
        <Route path="/profilePage">
          <ProfilePage />
        </Route>
        <Route path="/loginPage">
          <LoginPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
