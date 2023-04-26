import axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../styles/header.scss'
function Header() {

  var CheckAuth=''
  var CheckUser=''
  

  const Logout=(e)=>{
    e.preventDefault()
    
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('logout').then(res=>{
        if(res.data.status===200)
        {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_name')
          swal('success',res.data.message)
          history.push('/')
        }
      })
  });

  const history=useHistory()

  }

  if(!localStorage.getItem('auth_token'))
  {
    CheckUser=(
      <Link to='/'>Alasdy</Link>

    )

  }
  else
  {

    CheckUser=(
      <Link to='/user'>{localStorage.getItem('user_name')}</Link>

    )
  }


  if(!localStorage.getItem('auth_token'))
  {
    CheckAuth=(
        <ul>
        <Link to='/auth/login'>Login</Link>
        <Link to='/auth/register'>Register</Link>

        </ul>
    )
  }
  else{
    CheckAuth=(
        <ul>
        <button onClick={Logout}>Logout</button>
        <Link to='/posts/insert-post'>Add Post</Link>

        </ul>
    )

  }
  return (
    <header>
    <div className="container">
      {CheckUser}
        <div className="middle">
        <h2>Inc. This Morning</h2>
        <h1>“ Blog ”</h1>
        <p>awesome place to make oneself
productive and entertained through daily updates.</p>
        </div>
        {CheckAuth}
    </div>
</header>
  )
}

export default Header