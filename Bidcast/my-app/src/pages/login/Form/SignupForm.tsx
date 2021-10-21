import { useForm } from "react-hook-form"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { login, loadToken } from "../../../redux/user/actions";
import { useState } from "react";
import { push } from "connected-react-router";


const { REACT_APP_BACKEND_URL } = process.env
export function SignupForm() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [registerError, setRegisterError]=useState('');
  return <div>
  <form onSubmit={handleSubmit(async data => {
    try {
      
  
      const res = await axios.post<any>(`${REACT_APP_BACKEND_URL}/register`, {
        username:data.username,
        email: data.email,
        password: data.password,
        phoneNumber:data.phoneNumber,
      })
      console.log(res.data)
      if (res.data.token != null) {
        
        localStorage.setItem('token', res.data.token)
        dispatch(login(res.data.token))
        dispatch(loadToken(res.data.token))
        dispatch(push('/'))
      }
      else {
        setRegisterError(`${res.data.data.msg}`)
      }
    } catch (e: any) {
      setRegisterError('unknown error')
    }
  })}>
   
    username<input {...register('username')} />
    email<input {...register('email')} />
    phoneNumber<input {...register('phoneNumber')} />
    password<input {...register('password')} />
    {registerError}
    <input type="submit" />
  </form>
  </div>
  }