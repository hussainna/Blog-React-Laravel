import React, { useState } from 'react'
import { useEffect } from 'react';
import { postData } from "../data/Data";
import '../styles/post.scss'
import swal from 'sweetalert'
import {useHistory} from 'react-router-dom'

import axios from 'axios'


function Posts() {
    const [Post,setPost]=useState([])

    const [Search,setSearch]=useState({
        search:'',
    })



    const history=useHistory()


    const handelSearch=(e)=>{
        e.persist()

        setSearch({...Search,[e.target.name]:e.target.value})
    }

    var searchHTML=''

    const SearchPost=(e)=>{
        e.preventDefault()
        console.log(Search.search)

        if(Search.search=== "")
        {
            axios.get('get-posts').then(res=>{
                if(res.data.status===200)
                {
                    setPost(res.data.post)
                }
               
            })
        }

        else
        {
            axios.get(`search-post/${Search.search}`).then(res=>{
                if(res.data.status===200)
                {
                    setPost(res.data.post)
                }
                
            })
        }
      
      
    }

    useEffect(()=>{

        axios.get('get-posts').then(res=>{
            if(res.data.status===200)
            {
                setPost(res.data.post)
            }
            else if(res.data.status===422)
            {
                swal(res.data.errors)
            }
        })

    },[])

  return (
    <div className="post">
    <div className="container">
        <div className="input-group">
            <input type="text" placeholder="Search By Category" value={Search.search} onChange={handelSearch} name="search" id="" />
            <button onClick={SearchPost}>Go</button>
        </div>
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
  )
}

export default Posts