import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const CreateBlog = () => {
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

      fetch(`${process.env.REACT_APP_SERVER_URL}/create-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          body: body,
          snippet: snippet
        })
      }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        history.go(0);
      })
      .catch(err => console.log(err));
    }
  
    return (
      <div className="container-fluid">

        <div className="create-blog-top">
          <h1 className="mt-2 mb-3 d-inline-block">Create a blog</h1>
          <button className="btn btn-secondary float-right mt-3" onClick={() => history.push('/') }>Back</button>
        </div>

        <label className="input-group" htmlFor="blog-title">
          Blog Title :{" "}
        </label>
        <input
          className=" input-group"
          type="text"
          id="blog-title"
          value={title}
          placeholder="Enter the title for your blog"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label className="input-group" htmlFor="blog-snippet">
          Blog Content:{" "}
        </label>
        <input
          className=" input-group"
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
          className=" input-group"
          type="text"
          id="blog-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter the secret message here..."
          rows="6"
        />
        <br />
        
        <button type="button" disabled={buttonHidden} className="btn btn-primary mt-3 mb-3" onClick={handleCreateBlog}>
          Send
        </button>
      </div>
    );
}

export default CreateBlog;