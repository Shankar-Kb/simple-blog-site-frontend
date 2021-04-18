import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'

const BlogDetailsPage = ({loggedIn}) => {

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
        displayComments(id);
    }, [id])

    useEffect(() => {
        if(commentBody.length > 0){
          setButtonHidden(false)
        }else{
          setButtonHidden(true)
        }
      }, [commentBody])

    const displayComments = (id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`, {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setComments(res);
            })
            .catch((error) => console.log(error))
    }

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
            setCommentBody("");
            setButtonHidden(true);
            displayComments(id);
          })
          .catch(err => console.log(err));
    }

    return (
        <div className="blog-details-box">
            {
                loaded ?
                    <>
                        <div className="blog-box">
                            <h3 className="blog-title"> {blog.title} </h3>
                            <p> {blog.body} </p>
                            <p> <b>Written By:</b> {blog.authorName}</p>
                            <p> <b>Written At:</b> {new Date(blog.createdAt).toString().replace(" GMT+0530 (India Standard Time)", "")}</p>
                        </div>

                        <div className="comments-box">
                            <h2> Comments </h2>
                            {   (comments.length === 0) ? <p className="text-center">No Comments</p> :
                                comments.map((elem, index) => (
                                    <div key={index} className="comment-box card card-body">
                                        <p> <b>{elem.authorName}:</b> {elem.body} <br />
                                        <b>At</b> {new Date(elem.createdAt).toString().replace(" GMT+0530 (India Standard Time)", "")}</p>
                                    </div>
                                ))}
                        </div>
                        
                        {loggedIn &&
                        <div className="create-comment-box">
                        <label className="input-group" htmlFor="blog-body">Write a comment :{" "}</label>
                            <textarea className=" input-group" type="text" id="blog-body" 
                            value={commentBody} onChange={(e) => setCommentBody(e.target.value)} 
                            placeholder="Enter your comment" rows="1"
                            />
                        <button type="button" disabled={buttonHidden} className="btn btn-outline-dark d-block mt-2 mx-auto" onClick={handleCreateComment}>
                            Create
                        </button>
                        </div>
                         }
                    </>
                    :
                    <>
                        <div className="spinner-border text-dark" role="status">
                             <span className="sr-only">Loading...</span>
                        </div>
                    </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      loggedIn: state.loggedIn
    }
  }

export default connect(mapStateToProps)(BlogDetailsPage);