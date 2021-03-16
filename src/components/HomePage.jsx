import React, { useEffect, useState } from 'react';
//import {useHistory} from 'react-router-dom'

const HomePage = () => {

    //const history = useHistory();
    const [blogs, setBlogs] = useState("");

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
            {blogs}
        </div>
    )
}

export default HomePage;