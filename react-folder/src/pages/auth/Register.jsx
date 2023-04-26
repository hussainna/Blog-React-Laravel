import React from 'react'
import { useState } from 'react'
import '../../styles/auth.scss'
import axios from 'axios'
import swal from 'sweetalert'
import {useHistory} from 'react-router-dom'
function Register() {

  const [Register,setRegister]=useState({
    name:'',
    email:'',
    password:'',
  })
  const handleInput=(e)=>{
    e.persist()
    setRegister({...Register,[e.target.name]:e.target.value})

  }

  const history=useHistory()

  const SubmitRegister=(e)=>{
    e.preventDefault()

    const data={
      name:Register.name,
      email:Register.email,
      password:Register.password,
      
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('register',data).then(res=>{
        if(res.data.status===200)
        {
          localStorage.setItem('auth_token',res.data.token)
          localStorage.setItem('user_name',res.data.user)
          swal('success',res.data.message)
          history.push('/')
        }
      })
  });
  }


  return (
    <div className="auth">
    <div className="card">
        <div className="col">
            <h1>Sign In</h1>
            <p>register and enjoy the service</p>
            <form onSubmit={SubmitRegister}>
              <div className="form-control">
              <input type="text" name='name' value={Register.name} onChange={handleInput} placeholder="user name" id="" />
              </div>
              <div className="form-control">
              <input type="text" name='email' value={Register.email} onChange={handleInput} placeholder="email" id="" />
              </div>
              <div className="form-control">
              <input type="password" name='password' value={Register.password} onChange={handleInput} placeholder="password" id="" />
              </div>
          
            <button className='button'>Sign In</button>

            </form>
          
        </div>
        {/* <div className="col">
           <img src="./assets/images/img1.jpg" alt="" />
        </div> */}
    </div>
</div>
  )
}

export default Register