import { useForm } from "react-hook-form"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { login } from "../redux/user/actions";
import { useState } from "react";
import { push } from "connected-react-router";
import ReactFacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
// sdfasd
export function Login() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch();
  const [error, setError] = useState('')

  const fBOnCLick = ()=> {
    return null;
}

const fBCallback = async (userInfo: ReactFacebookLoginInfo & { accessToken: string }) => {
    if (userInfo.accessToken) {
      try {
        const res = await axios.post<any>(`${process.env.REACT_APP_BACKEND_URL}/login/facebook`, {
          accessToken: userInfo.accessToken
        })
        
        if (res.data.token != null) {
          localStorage.setItem('token', res.data.token)
          dispatch(login(res.data.token))
          dispatch(push('/'))
        } else {
          setError('錯密碼啊老友')
        }
      } catch (e: any) {
        if (e?.response.status === 401) {
          setError('錯密碼啊老友')
        } else {
          console.error(e)
          setError('發生未知錯誤')
        }
      }
    }
    return null;
}
  return (
    <div>
      <form onSubmit={handleSubmit(async data => {
        try {
          const res = await axios.post<any>(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            username: data.username,
            password: data.password
          })
          
          if (res.data.token != null) {
            localStorage.setItem('token', res.data.token)
            dispatch(login(res.data.token))
            dispatch(push('/'))
          } else {
            setError('錯密碼啊老友')
          }
        } catch (e: any) {
          if (e?.response.status === 401) {
            setError('錯密碼啊老友')
          } else {
            console.error(e)
            setError('發生未知錯誤')
          }
        }
      })}>
        <input {...register('username')} />
        <input {...register('password')} />
        {error}
        <input type="submit" />
      </form>
      <ReactFacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
          autoLoad={false}
          fields="name,email,picture"
          onClick={fBOnCLick}
          callback={fBCallback}
      />  

    </div>
  )
}