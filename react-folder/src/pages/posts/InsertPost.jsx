import React, { useState } from 'react'
import '../../styles/auth.scss'
import axios from 'axios'
import swal from 'sweetalert'
import {useHistory} from 'react-router-dom'


function InsertPost() {

  const [Posts,setPosts]=useState({
    name:'',
    category:'',
    description:'',
  })

  const handleInput=(e)=>{
    e.persist();
    setPosts({...Posts,[e.target.name]:e.target.value})

  }

  const [Image,setImage]=useState('')

  const handleImage=file=>{
    setImage(file[0])
  }

  const history=useHistory()

  const SubmitPost=(e)=>{
    e.preventDefault()

    const fd=new FormData()
    fd.append('name',Posts.name)
    fd.append('category',Posts.category)
    fd.append('description',Posts.description)
    fd.append('image',Image)

    console.log(fd)
    
    axios.post('insert-post',fd).then(res=>{
      if(res.data.status=200)
      {
        swal('success',res.data.message)
        history.push('/')
      }
    })

  }

  
  return (
    <div className="auth">
    <div className="card">
        <div className="col">
            <h1>Add Post</h1>
            <p>Make Post and let the people see your posts</p>
            <form onSubmit={SubmitPost} encType="multipart/form-data">
                <div className="form-group">
                    <select name="category" value={Posts.category} onChange={handleInput}>
                        <option >Select Category</option>
                        <option >Development</option>
                        <option >Cocking</option>
                        <option >Travel</option>
                        <option >Advientcher</option>

                    </select>
                </div>
              <div className="form-control">
              <input type="text" name='name' value={Posts.name} onChange={handleInput} placeholder="name" id="" />
              </div>
              <div className="form-control">
              <input type="text" placeholder="description" id="" name='description' value={Posts.description} onChange={handleInput}/>
              </div>
              <div className="form-control">
              <input type="file" name='image' placeholder='Add Image' onChange={e=>handleImage(e.target.files)} />
              </div>
            
            <button className='button'>Insert</button>
            </form>
          
        </div>
        {/* <div className="col">
           <img src="./assets/images/img1.jpg" alt="" />
        </div> */}
    </div>
</div>
  )
}

export default InsertPost