import React from "react";
import { NavLink, Route, Switch, BrowserRouter, withRouter } from "react-router-dom";
import { ConnectedRouter, push } from 'connected-react-router';
import { history,store } from '../../store';
import { Provider } from "react-redux";
import './Login.scss';
import hammer from "./hammer.png"
import { SignupForm } from "./Form/SignupForm";
import { LoginForm } from "./Form/LoginForm";
import { useDispatch } from "react-redux"
import { login } from "../../redux/user/actions";
import { useState } from "react";
import axios from 'axios'
import ReactFacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import {TransitionGroup, CSSTransition} from 'react-transition-group'


const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={4000}>
      <Switch>
      <Route exact path="/loginPage/SignupForm"  component={SignupForm}/>
              <Route exact path="/loginPage" component={LoginForm}/>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export function LoginPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState('')

  const fBOnCLick = ()=> {
    return null;
}
const fBCallback = async (userInfo: ReactFacebookLoginInfo & { accessToken: string }) => {
  console.log('userInfo')
  
    if (userInfo.accessToken) {
      try {
        
        const res = await axios.post<any>(`${process.env.REACT_APP_BACKEND_URL}/login/facebook`, {
          accessToken: userInfo.accessToken
        })
        console.log(res.data)
        
        if (res.data.token != null) {
          localStorage.setItem('token', res.data.token)
          dispatch(login(res.data.token))
          dispatch(push('/'))
        } else {
          setError('email or password wrong')
        }
      } catch (e: any) {
        if (e?.response.status === 401) {
          setError('發生未知錯誤')
        } else {
          console.error(e)
          setError('發生未知錯誤')
        }
      }
    }
    return null;
}
  return (
    
<Provider store={store}>
  <ConnectedRouter history={history}>
  <BrowserRouter>
    <div className="fakeapp">
      <div className="appAside">
        <img className="smallpic" src={hammer} alt="hammer"/>
      </div>
        <div className="appForm">
        <div className="formTitle">
          <NavLink exact to = '/loginPage'
            activeClassName="formTitleLink-active"
            className="formTitleLink">登入</NavLink>
          or
          <NavLink exact to = '/loginPage/SignupForm'
          activeClassName="formTitleLink-active"
          className="formTitleLink"
          >註冊</NavLink>
        </div>
        <div className="formTitle">
          
        <ReactFacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
          autoLoad={false}
          fields="name,email,picture"
          onClick={fBOnCLick}
          callback={fBCallback}
      /> 
        {error}
        </div>
        <AnimatedSwitch />
      {/* <TransitionGroup>
        <CSSTransition
        > */}
            {/* <Switch>
       
              <Route exact path="/loginPage/SignupForm"  component={SignupForm}/>
              <Route exact path="/loginPage" component={LoginForm}/>
        
          </Switch> */}
        {/* </CSSTransition>
      </TransitionGroup> */}
        </div>
      </div>
      </BrowserRouter>
  </ConnectedRouter>
</Provider>

  )
}
