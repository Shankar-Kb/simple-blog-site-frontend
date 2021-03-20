import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const BlogDetailsPage = () => {

    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    const [buttonHidden, setButtonHidden] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setBlog(res);
                setLoaded(true);
            })
            .catch((error) => console.log(error))

    }, [id])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`, {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setComments(res);
            })
            .catch((error) => console.log(error))

    }, [id])

    useEffect(() => {
        if(commentBody.length > 0){
          setButtonHidden(false)
        }else{
          setButtonHidden(true)
        }
      }, [commentBody])

    const handleCreateComment = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/create-comment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              body: commentBody,
              blogId: id,
              authorName: blog.authorName
            })
          }).then((res) => res.json())
          .then((res) => {
            console.log(res);
            setButtonHidden(true);
          })
          .catch(err => console.log(err));
    }

    return (
        <div className="container-fluid">
            {
                loaded ?
                    <>
                        <div className="blog-box">
                            <h3> {blog.title} </h3>
                            <p> {blog.body} </p>
                            <p> Written By {blog.authorName}</p>
                            <p> Written At {blog.createdAt}</p>
                        </div>

                        <div className="comments-box">
                            {
                                comments.map((elem, index) => (
                                    <div key={index} className="blog-box">
                                        <p> {elem.authorName}: {elem.body} At {elem.createdAt}</p>
                                    </div>
                                ))}
                        </div>

                        <label className="input-group" htmlFor="blog-body">Write a comment :{" "}</label>
                            <textarea className=" input-group" type="text" id="blog-body" 
                            value={commentBody} onChange={(e) => setCommentBody(e.target.value)} 
                            placeholder="Enter your comment" rows="1"
                            />
                            <br />
                        <button type="button" disabled={buttonHidden} className="btn btn-primary" onClick={handleCreateComment}>
                            Create
                        </button>
                    </>
                    :
                    <>
                        <div>Loading...</div>
                    </>
            }
        </div>
    )
}

export default BlogDetailsPage;