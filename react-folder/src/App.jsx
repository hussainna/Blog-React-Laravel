import React from 'react'
import {BrowserRouter  as Router,Redirect,Route,Switch} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import InsertPost from './pages/posts/InsertPost'
import axios from 'axios'
import Search from './pages/posts/Search'
import User from './pages/User'


function App() {

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL='http://localhost:8000/api/'
  axios.defaults.headers.post['Accept']='application/json'
  axios.defaults.headers.post['Content-Type']='application/json'
  axios.defaults.headers.post['Content-Type']='multipart/form-data'

  axios.interceptors.request.use(function(config){
    const token=localStorage.getItem('auth_token')
    config.headers.authorization=token?`Bearer ${token}`:'';
    return config
  })

  return (
     <>
       <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/auth/login' >
          {localStorage.getItem('auth_token')?<Redirect to='/' />:<Login/>}

          </Route>
          <Route path='/auth/register'>
            {localStorage.getItem('auth_token')?<Redirect to='/' />:<Register/>}
          </Route>
          <Route path='/posts/insert-post' component={InsertPost}/>
          <Route path='/posts/search' component={Search}/>
          <Route path='/user' component={User}/>
        </Switch>
       </Router>
     </>
  )
}

export default App
