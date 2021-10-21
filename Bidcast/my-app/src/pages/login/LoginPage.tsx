import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history,store } from '../../store';
import { Provider } from "react-redux";
import './Login.scss';
import hammer from "./hammer.png"
import { SignupForm } from "./Form/SignupForm";
import { LoginForm } from "./Form/LoginForm";
export function LoginPage() {
  // const dispatch = useDispatch();
  return (
    
<Provider store={store}>
  <ConnectedRouter history={history}>
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
        </div><Switch>

              
        
        
            
          <Route exact path="/loginPage/SignupForm"  component={SignupForm}/>
           <Route exact path="/loginPage" component={LoginForm}/>
        
            </Switch>
            
        </div>
      </div>
    
  </ConnectedRouter>
</Provider>

  )
}
