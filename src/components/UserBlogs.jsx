import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

const UserBlogs = ({userId}) => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/blogs/user/${userId}`, {
            credentials: "include"})
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            setBlogs(res);
        })
        .catch((error) => console.log(error))
        
    }, [userId])

    return(
        <div className="container-fluid">
            {
            blogs.map(( elem, index ) => (
				<div key={index} className="blog-box">
                <h3> {elem.title} </h3>
                <p> {elem.snippet} </p>
                <p> Written By {elem.authorName}</p>
                <p> Written At {elem.createdAt}</p>
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