import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history,store } from '../../store';
import { Provider } from "react-redux";
import './Login.scss';
import { useState } from "react";
import { SignupForm } from "./Form/SignupForm";
import { LoginForm } from "./Form/LoginForm";

export function LoginPage() {
  const [active, setActive] = useState('Login')
  // const dispatch = useDispatch();
  return (
    
<Provider store={store}>
  <ConnectedRouter history={history}>
    <div>
      <div className="formTitle">
        <NavLink to = '/loginPage'>login</NavLink>
      </div>
        or
      <div className="formTitle">
        <NavLink to = '/loginPage/SignupForm'
        activeClassName="pageSwitcherItem-active"
        className="pageSwitcherItem"
        >signup</NavLink>
      </div>
      <Switch>
        <Route path="/loginPage/SignupForm" component={SignupForm}/>
        <Route path="/loginPage" component={LoginForm}/>
      </Switch>
    </div>
  </ConnectedRouter>
</Provider>

  )
}