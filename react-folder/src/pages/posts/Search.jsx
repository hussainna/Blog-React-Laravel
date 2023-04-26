import React from 'react'
import Header from '../../components/Header'
function Search() {
  return (
    <div>
        <Header/>

        <div className="post">
    <div className="container">
        
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

export default Search