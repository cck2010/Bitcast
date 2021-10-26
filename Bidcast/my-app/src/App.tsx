import React, { useEffect, useRef, useState } from "react";
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
import { ProfilePage } from "./pages/Profile-Page/Profilepage";
import { CategoryResults } from "./pages/categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import { checkCurrentUser } from "./redux/user/actions";
// import { CreateBids } from "./pages/createbids/CreateBids";
import { useAdBlockDetector } from "adblock-detector-hook";
import { RootState } from "./store";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { JWTPayload } from "./redux/user/reducer";



import ToastDemo from "./pages/login/alert";
import { CToaster } from "@coreui/react";

interface Toast{
  toast:number;
  addToast:number;
}

function App() {
  const dispatch = useDispatch();
  const [isAlertChecked, setIsAlertChecked] = useState(false);
  const userInfo  = useSelector((state: RootState) => state.authState.user);
  
const toaster = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {



    if (!isAlertChecked) {
        dispatch(checkCurrentUser());
        
        console.log("userInfo = ", userInfo)
        
        if (typeof userInfo !=="string" &&  userInfo !== undefined && userInfo.phone_number!== '11111111'){
          ToastDemo()
        }
        
        setIsAlertChecked(true)
    }
    // (dispatch(push('/profilePage/accountDetails')))
    // //    ( isAlertChecked(`請到個人頁面更改電話號碼`))
  }, [dispatch, isAlertChecked, userInfo]);


  
  const { detected } = useAdBlockDetector();
  <div>AdBlocker Detected: {JSON.stringify(detected)}</div>;

  return (
    <div className="App">
        {/* {} */}
      {detected ? (
        <div className="turn_off_adblock">Please Turn Off Your Adblock!!</div>
      ) : (
        <>
        
        <CToaster ref={toaster} push={<ToastDemo/>} placement="bottom-end"/>
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
  );
}

export default App;