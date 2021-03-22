import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Homepage.css';

const HomePage = () => {

    //const history = useHistory();
    const [blogs, setBlogs] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0)

    const perPage = 3

    const [search, setSearch] = useState("");
    const [buttonHidden, setButtonHidden] = useState(true);

    useEffect(() => {
        //Fetch get method to get all the blogs
        fetch(`${process.env.REACT_APP_SERVER_URL}/blogs/all`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            const slice = data.slice(offset, offset + perPage)

                  const currentPage = slice.map(( elem, index ) => (
                    <div key={index} className="blog-box card card-body">
                     <Link className="card-title" to={`/blog/${elem._id}`}><h3>{elem.title}</h3></Link>
                    <p className="card-text"> {elem.snippet} </p>
                    <p> <b>Written By:</b> {elem.authorName}</p>
                    <p> <b>Written At:</b> {new Date(elem.createdAt).toString().replace(" GMT+0530 (India Standard Time)", "")}</p>
                    </div>
                ))

            setBlogs(currentPage);
            setPageCount(Math.ceil(data.length / perPage))
        })
        .catch((error) => console.log(error))
        
    }, [offset])

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
                    <div key={index} className="blog-box card card-body">
                     <Link className="card-title" to={`/blog/${elem._id}`}><h3>{elem.title}</h3></Link>
                    <p className="card-text"> {elem.snippet} </p>
                    <p> Written By {elem.authorName}</p>
                    <p> Written At {new Date(elem.createdAt).toString().replace(" GMT+0530 (India Standard Time)", "")}</p>
                    </div>
                ))

            setBlogs(currentPage);
            setPageCount(Math.ceil(data.length / perPage))
        })
        .catch((error) => console.log(error))
    }

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

        </div>

    )
}

export default HomePage;