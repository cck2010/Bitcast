import React, { useEffect } from "react";
import "react-custom-scroll/dist/customScroll.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.scss";
import LiveStream from "./pages/LiveStream/LiveStream";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { HomePageNavbar } from "./pages/homepage/Navbar";
import { Footer } from "./pages/homepage/Footer";
import { CreateBids } from "./pages/createbids/CreateBids";
import LiveStreamSeller from "./pages/LiveStream/LiveStreamSeller";
import { Homepage } from "./pages/homepage/Homepage";
import { profile } from "console";
import { ProfilePage } from "./pages/Profile-Page/Profilepage";
import { CategoryResults } from "./pages/categories/Categories";
import { useDispatch } from "react-redux";
import { checkCurrentUser,} from "./redux/user/actions";
// import { CreateBids } from "./pages/createbids/CreateBids";
import { useAdBlockDetector } from "adblock-detector-hook";
// import{CheckUserPhoneNumber,} from "./redux/user/actions"

import { ToastProvider } from 'react-toast-notifications';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkCurrentUser());
        
        // dispatch(CheckUserPhoneNumber())
        // ?
        // dispatch(Toasts())
        // (dispatch(push('/profilePage/accountDetails')))
        
        // //    ( alert(`請到個人頁面更改電話號碼`))
        
        // :
        // (console.log('vaild phoneNumber'))
        
    }, [dispatch,]);

    const { detected } = useAdBlockDetector();
    <div>AdBlocker Detected: {JSON.stringify(detected)}</div>;

    return (
        <ToastProvider>
        <div className="App">
            {detected ? (
                <div className="turn_off_adblock">
                    Please Turn Off Your Adblock!!
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
        </ToastProvider>
    );
}

export default App;
