import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
//import {useHistory} from 'react-router-dom'

const HomePage = () => {

    //const history = useHistory();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        //Fetch get method to get all the blogs
        fetch(`${process.env.REACT_APP_SERVER_URL}/blogs/all`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            setBlogs(res);
        })
        .catch((error) => console.log(error))
        
    }, [])

    return(
        <div className="container-fluid">
            {
            blogs.map(( elem, index ) => (
				<div key={index} className="blog-box">
                 <Link to={`/blog/${elem._id}`}><h3>{elem.title}</h3></Link>
                <p> {elem.snippet} </p>
                <p> Written By {elem.authorName}</p>
                <p> Written At {elem.createdAt}</p>
				</div>
            ))}
        </div>
    )
}

export default HomePage;