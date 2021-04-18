import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { Modal } from "react-bootstrap";

const UserBlogs = ({userId}) => {

    const [blogs, setBlogs] = useState([]);
    
    const [show, setShow] = useState(false);
    const handleModalClose = () => setShow(false);
    const handleModalShow = () => setShow(true);

    const [blogId, setBlogId] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [blogSnippet, setBlogSnippet] = useState("");
    const [blogBody, setBlogBody] = useState("");

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
 
    const handleEditToggle = (id, title, snippet, body) => {
          
          setBlogId(id);
          setBlogTitle(title);
          setBlogSnippet(snippet);
          setBlogBody(body);
          handleModalShow();
          //console.log(id);
    }

    const handleEditSave = (id) => {
          
        fetch(`${process.env.REACT_APP_SERVER_URL}/edit-blog/${id}`, {
            
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
              },
            credentials: "include",
            body: JSON.stringify({
                title: blogTitle,
                body: blogBody,
                snippet: blogSnippet
              })
        })
        .then((res) => res.json())
        .then((res) => {
            handleModalClose();
            showUserBlogs(); 
        })

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

    return (
        <div className="container-fluid user-blogs-box col-6 offset-3">
            {blogs.map((elem, index) => (
                <div key={index} className="blog-box card card-body">
                    <Link className="card-title" to={`/blog/${elem._id}`} style={{ textDecoration: 'none' }}><h3 className="blog-title">{elem.title}</h3></Link>
                    <p className="card-text"> {elem.snippet} </p>
                    <p className="card-text"> {elem.body} </p>
                    <p> <b>Written By:</b> {elem.authorName}</p>
                    <p> <b>Written At:</b> {new Date(elem.createdAt).toString().replace(" GMT+0530 (India Standard Time)", "")}</p>
                    <div className="blogs-buttons-box">
                        <button type="button" className="btn btn-dark mr-1" onClick={() => { handleEditToggle(elem._id, elem.title, elem.snippet, elem.body) }}>Edit</button>
                        <button type="button" className="btn btn-dark ml-1" onClick={() => { handleBlogDelete(elem._id) }}>Delete</button>
                    </div>
                </div>
            ))}
            
            <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title> Edit your blog </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <label className="input-group" htmlFor="blog-title"> Blog Title :{" "} </label>
                  <input
                    className="form-control"
                    type="text"
                    id="blog-title"
                    value={blogTitle}
                    placeholder={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                  />
                <label className="input-group" htmlFor="blog-snippet"> Blog Snippet :{" "} </label>
                  <input
                    className="form-control"
                    type="text"
                    id="blog-snippet"
                    value={blogSnippet}
                    placeholder={blogSnippet}
                    onChange={(e) => setBlogSnippet(e.target.value)}
                  />
                <label className="input-group" htmlFor="blog-body"> Blog Body :{" "} </label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="blog-body"
                    value={blogBody}
                    placeholder={blogBody}
                    onChange={(e) => setBlogBody(e.target.value)}
                    rows="6"
                  />
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-dark" onClick={handleModalClose}>
                        Close
                    </button>
                    <button type="button" className="btn btn-dark" onClick={()=>{ handleEditSave(blogId) }}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userId: state.userId
    }
  }

export default connect(mapStateToProps)(UserBlogs);