import React, { useState } from 'react'
import '../styles/post.scss'
import '../styles/user.scss'
import { useEffect } from 'react';
import {BsArrowLeft} from 'react-icons/bs'
import {Link, useHistory} from 'react-router-dom'

import axios from 'axios'


function User() {
    const [Post,setPost]=useState([])


    useEffect(()=>{

        axios.get('get-user-posts').then(res=>{
            if(res.data.status===200)
            {
                setPost(res.data.post)
            }
        })

    },[])



  return (
    <div className='user'> 
     <div className="container">
        <div className="top">
           
            <h2>Welcome to your profile</h2>
            <h1>{localStorage.getItem('user_name')}</h1>
            <p>this is your posts thanks for all the information you give </p>
            <Link to='/'>
               <i><BsArrowLeft/></i>
               <h4>Back</h4>
            </Link>
        </div>
        <div className="post">
   
        <div className="row">
            {Post.map((item,idx)=>(
                <div className="col" key={idx}>
                    <img className="post-img" src={`http://localhost:8000/${item.image}`} alt="" />
                    <label>{item.category}</label>
                    <h4>{item.name}</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aliquam a incidunt, placeat facere, eveniet</p>
                    <div className="info">
                    <img className="author-img" src="./assets/images/author.jpg" alt="" />
                     <div className="info-text">
                     <h5>John Doe</h5>
                    <p>June 03, 2021</p>
                     </div>
                    </div>
                </div>



            ))}
        </div>
    </div>
</div>
    </div>
  )
}

export default User