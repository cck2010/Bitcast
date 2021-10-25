import React from "react";
import { NavLink, Route, Switch, BrowserRouter, withRouter } from "react-router-dom";
import { ConnectedRouter, push } from 'connected-react-router';
import { history,store } from '../../store';
import { Provider } from "react-redux";
import './Login.scss';
import image from "./img2.jpg"
import { SignupForm } from "./Form/SignupForm";
import { LoginForm } from "./Form/LoginForm";
import { useDispatch } from "react-redux"
import { CheckUserPhoneNumber, loadToken, login, Toasts } from "../../redux/user/actions";
import { useState } from "react";
import axios from 'axios'
import FacebookLogin from "react-facebook-login";
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import GoogleLogin from 'react-google-login';


const AnimatedSwitch = withRouter(({ location }) => (
  <SwitchTransition>
    <CSSTransition 
    key={location.key} 
    classNames="my-node" 
    timeout={300}
    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
    unmountOnExit
    >
      <Switch>
      <Route exact path="/loginPage/SignupForm"  component={SignupForm}/>
              <Route exact path="/loginPage" component={LoginForm}/>
      </Switch>
    </CSSTransition>
  </SwitchTransition>
));

export function LoginPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState('')

  const responseGoogle = async (response:any ) => {
    if(response.profileObj){
console.log(response.profileObj);

    try {
        
        const res = await axios.post<any>(`${process.env.REACT_APP_BACKEND_URL}/login/google`, {
          name:response.profileObj.name,
          email:response.profileObj.email,
          image:response.profileObj.imageUrl
        })
        
        
        if (res.data.token != null) {
          localStorage.setItem('token', res.data.token)
          dispatch(login(res.data.token))
          dispatch(loadToken(res.data.token))
          // dispatch(checkUserPhoneNumber())?
          // dispatch((Toasts())):
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

  const responseFacebook = async (response:any) => {
    
  console.log(response)
  
    
  if(response){
        try {
            
            const res = await axios.post<any>(`${process.env.REACT_APP_BACKEND_URL}/login/facebook`, {
              name:response.name,
              email:response.email,
              image:response.picture.data.url
            })
            console.log(res.data)
            
            if (res.data.token != null) {
              localStorage.setItem('token', res.data.token)
              dispatch(login(res.data.token))
              dispatch(loadToken(res.data.token))
              // dispatch(checkUserPhoneNumber())?
              // dispatch((PhoneNumberMessageBox())):
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

    function FbButton() {return <div className="flex-icon">
      <span >
<div className="fab fa-facebook-square fa-lg rightMargin" />


</span>
<div>Login with Facebook</div>
</div>;}

  return (
    
<Provider store={store}>
  <ConnectedRouter history={history}>
  <BrowserRouter>
    <div className="fakeapp">
      
      <div className="appAside">
        <img className='smallpic'  src={image} alt={image} />
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

      <FacebookLogin
    appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="fbcss"
    icon={<FbButton/>}
    textButton=''
  />
      

<GoogleLogin
    clientId="258328672991-k7fkb7k0tpiqp4an1ia3l23lig791nt2.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />

        {error}
        </div>
        <AnimatedSwitch />
     
        </div>
        </div>
      
      </BrowserRouter>
  </ConnectedRouter>
</Provider>

  )
}
