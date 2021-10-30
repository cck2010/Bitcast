import { Sidebar } from "./Sidebar";
import "./Profilepage.scss";
import { AccountDetails } from "./AccountDetails";
import { Follower } from "./Follower";
import { Following } from "./Following";
import { Route, Switch } from "react-router-dom";
import { MyLive } from "./MyLive";
import { MyLiveProductsComponent } from "./MyLiveProducts";

// import { useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";

export function ProfilePage() {
    return (
        <div className="profile_page">
            <Sidebar />
            <Switch>
                <Route path="/profilePage/follower">
                    <Follower />
                </Route>
                <Route path="/profilePage/following">
                    <Following />
                </Route>
                <Route path="/profilePage/accountDetails">
                    <AccountDetails />
                </Route>
                <Route path="/profilePage/my-live-products">
                    <MyLiveProductsComponent />
                </Route>
                <Route path="/profilePage/my-live">
                    <MyLive />
                </Route>
            </Switch>
        </div>
    );
}
