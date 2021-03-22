import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const UserBlogs = ({userId}) => {

    const [blogs, setBlogs] = useState([]);

    const showUserBlogs = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/blogs/user/${userId}`, {
            credentials: "include"})
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            setBlogs(res);
        })
        .catch((error) => console.log(error))
    }
 
    const handleBlogEdit = (id) => {
        
          //console.log(id);
    }

    const handleBlogDelete = (id) => {
        
        fetch(`${process.env.REACT_APP_SERVER_URL}/delete-blog/${id}`, {
            credentials: "include",
            method: "DELETE"
        })
        .then((res) => res.json())
        .then((res) => {
            showUserBlogs(); 
        })
    }

    useEffect(showUserBlogs, [userId]);

    return(
        <div className="container-fluid user-blogs-box col-6 offset-3">
            {blogs.map(( elem, index ) => (
                    <div key={index} className="blog-box card card-body">
                     <Link className="card-title" to={`/blog/${elem._id}`}><h3>{elem.title}</h3></Link>
                    <p className="card-text"> {elem.snippet} </p>
                    <p> <b>Written By:</b> {elem.authorName}</p>
                    <p> <b>Written At:</b> {new Date(elem.createdAt).toString().replace(" GMT+0530 (India Standard Time)", "")}</p>
                    <div className="blogs-buttons-box">
                    <button type="button" className="btn btn-dark" onClick={()=>{handleBlogEdit(elem._id)}}>Edit</button>
                    <button type="button" className="btn btn-dark" onClick={()=>{handleBlogDelete(elem._id)}}>Delete</button>
                    </div>
                    </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userId: state.userId
    }
  }

export default connect(mapStateToProps)(UserBlogs);