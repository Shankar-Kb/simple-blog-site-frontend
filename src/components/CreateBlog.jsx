import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';

const CreateBlog = ({userId, userName}) => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [snippet, setSnippet] = useState("");
    const [body, setBody] = useState("");
    const [buttonHidden, setButtonHidden] = useState(true);
      
    useEffect(() => {
      if(title.length > 0 && snippet.length>0 && body.length > 0){
        setButtonHidden(false)
      }else{
        setButtonHidden(true)
      }
    }, [title, snippet, body])
  
    const handleCreateBlog = () => {

      fetch(`${process.env.REACT_APP_SERVER_URL}/create-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          body: body,
          snippet: snippet,
          authorId: userId,
          authorName: userName
        })
      }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        history.push('/');
      })
      .catch(err => console.log(err));
    }
  
    return (
      <div className="create-blog-box">

        <div className="create-blog-top">
          <h1 className="mt-2 mb-3 d-inline-block">Create a blog</h1>
        </div>

        <label className="input-group" htmlFor="blog-title">
          Blog Title :{" "}
        </label>
        <input
          className="form-control"
          type="text"
          id="blog-title"
          value={title}
          placeholder="Enter the title for your blog"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label className="input-group" htmlFor="blog-snippet">
          Blog Snippet:{" "}
        </label>
        <input
          className="form-control"
          type="text"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          id="blog-snippet"
          placeholder="Briefly describe about your blog"
        />
        <br />
        <label className="input-group" htmlFor="blog-body">
          Blog Content :{" "}
        </label>
        <textarea
          className="form-control"
          type="text"
          id="blog-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter the content for your blog"
          rows="6"
        />
        <br />
        <div className="create-blog-bottom">
        <button className="btn btn-outline-danger" onClick={() => history.push('/') }>Back</button>
        <button type="button" disabled={buttonHidden} className="btn btn-outline-primary" onClick={handleCreateBlog}>
          Create
        </button>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    userId: state.userId
  }
}

export default connect(mapStateToProps)(CreateBlog);