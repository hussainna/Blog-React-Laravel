import React, { useState } from 'react'
import '../../styles/auth.scss'
import axios from 'axios'
import swal from 'sweetalert'
import {useHistory} from 'react-router-dom'


function Login() {

  const [Login,setLogin]=useState({
    email:'',
    password:'',
  })
  const handleInput=(e)=>{
    e.persist()
    setLogin({...Login,[e.target.name]:e.target.value})

  }

  const history=useHistory()

  const SubmitLogin=(e)=>{
    e.preventDefault()

    const data={
      email:Login.email,
      password:Login.password,
      
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('login',data).then(res=>{
        if(res.data.status===200)
        {
          localStorage.setItem('auth_token',res.data.token)
          localStorage.setItem('user_name',res.data.user)
          history.push('/')

          swal('success',res.data.message)
        }
      })
  });
  }


  return (
    <div className="auth">
    <div className="card">
        <div className="col">
            <h1>Login</h1>
            <p>Login and enjoy the service</p>
            <form onSubmit={SubmitLogin}>
              <div className="form-control">
              <input type="text" name='email' value={Login.email} onChange={handleInput} placeholder="email" id="" />
              </div>
              <div className="form-control">
              <input type="password" name='password' value={Login.password} onChange={handleInput} placeholder="password" id="" />
              </div>
            <button className='button'>Login In</button>
            </form>
            
        </div>
        
    </div>
</div>
  )
}

export default Login