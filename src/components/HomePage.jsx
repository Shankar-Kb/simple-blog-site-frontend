import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import './Homepage.css';

const HomePage = () => {

    const userRole = useSelector(state => state.userRole);

    const [blogs, setBlogs] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const perPage = 3;

    const [search, setSearch] = useState("");
    const [buttonHidden, setButtonHidden] = useState(true);

    const [show, setShow] = useState(false);
    const handleModalClose = () => setShow(false);
    const handleModalShow = () => setShow(true);

    const [blogId, setBlogId] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [blogSnippet, setBlogSnippet] = useState("");
    const [blogBody, setBlogBody] = useState("");

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    useEffect(() => {
        if(search.length > 0){
          setButtonHidden(false);
        }else{
          setButtonHidden(true);
        }
      }, [search])

    const handleBlogsSearch = () => {
        const searchNew = search.replace(/\s/g, '_')
        fetch(`${process.env.REACT_APP_SERVER_URL}/blogs/${searchNew}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            const slice = data.slice(offset, offset + perPage)

                  const currentPage = slice.map(( elem, index ) => (
                    <div key={index} className="blog-box card">
                      <div className="card-body">
                        <Link className="card-title" to={`/blog/${elem._id}`}><h3>{elem.title}</h3></Link>
                        <p className="card-text"> {elem.snippet} </p>
                        <p> Written By {elem.authorName}</p>
                        <p> Written At {new Date(elem.createdAt).toString().replace(" GMT+0530 (India Standard Time)", "")}</p>
                      </div>
                    </div>
                ))

            setBlogs(currentPage);
            setPageCount(Math.ceil(data.length / perPage))
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
          showAllBlogs(); 
      })

  }

  const handleBlogDelete = (id) => {
      
      fetch(`${process.env.REACT_APP_SERVER_URL}/delete-blog/${id}`, {
          credentials: "include",
          method: "DELETE"
      })
      .then((res) => res.json())
      .then((res) => {
          showAllBlogs(); 
      })
  }

  const showAllBlogs = () => {
    //Fetch get method to get all the blogs
    fetch(`${process.env.REACT_APP_SERVER_URL}/blogs/all`)
    .then((res) => res.json())
    .then((res) => {
        //console.log(res);
        const data = res;
        const slice = data.slice(offset, offset + perPage)

              const currentPage = slice.map(( elem, index ) => (
                <div key={index} className="blog-box card">
                  <div className="card-body">
                    <Link className="card-title" to={`/blog/${elem._id}`} style={{ textDecoration: 'none' }}><h3 className="blog-title">{elem.title}</h3></Link>
                    <p className="card-text"> {elem.snippet} </p>
                    <p> <b>Written By:</b> {elem.authorName}</p>
                    <p> <b>Written At:</b> {new Date(elem.createdAt).toString().replace(" GMT+0530 (India Standard Time)", "")}</p>
                    {userRole === 'admin' && <div className="blogs-buttons-box">
                      <button type="button" className="btn btn-dark mr-1" onClick={() => { handleEditToggle(elem._id, elem.title, elem.snippet, elem.body) }}>Edit</button>
                      <button type="button" className="btn btn-dark ml-1" onClick={() => { handleBlogDelete(elem._id) }}>Delete</button>
                    </div>}
                  </div>
                </div>
            ))

        setBlogs(currentPage);
        setPageCount(Math.ceil(data.length / perPage))
    })
    .catch((error) => console.log(error))

    }

  useEffect(showAllBlogs, [offset]) // eslint-disable-line react-hooks/exhaustive-deps

    return(

        <div className="container-fluid homepage col-6 offset-3">

            <div className="blogs-search-box input-group">
                <input type="text" className="form-control" placeholder="Search blogs" value={search}
                  onChange={(e) => setSearch(e.target.value)}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" disabled={buttonHidden} type="button" onClick={handleBlogsSearch}>Search</button>
                </div>
            </div>

            <div className="blogs-box">{blogs}</div>

            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />

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

export default HomePage;