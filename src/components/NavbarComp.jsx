import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const NavbarComp = ({loggedIn, userLoggedOut, userLoggedIn}) => {

  useEffect(() => {
    let cookie = cookies.get("jwt");
    if(cookie){
    fetch(`${process.env.REACT_APP_SERVER_URL}/login-check`, {
      credentials: "include"})
        .then((res) => res.json())
        .then((res) => {
            //console.log(res);
            if(!res.error){
            userLoggedIn(res.userEmail, res.userName, res.userId);
            }
        })
        .catch((error) => console.log(error))
    }
  }, [userLoggedIn]);

  const handleLogout = () => {
    //Logout code goes here
    userLoggedOut();
    fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        }
      )
      .catch(err => console.log(err));
  }


  return (
    <div className="navbar-container">
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/">Simple Blog Site</Link>
        {loggedIn ?
        <div className="navbar-right-box">
        <Link className="btn btn-secondary" to="/create-blog">Create a Blog</Link>
        <Link className="btn btn-secondary" to="/user-blogs">My Blogs</Link>
        <button type="button" className="btn btn-secondary mt-3 mb-3" onClick={handleLogout}>Logout</button>
        </div> 
          :
          <div className="navbar-right-box">
            <Link className="btn btn-secondary" to="/login">Login</Link>
            <Link className="btn btn-secondary" to="/signup">Signup</Link>
          </div>}
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedOut: () => dispatch({type: 'LOGOUT'}),
    userLoggedIn: (userEmail, userName, userId) => dispatch({type: 'LOGIN', mail: userEmail, name: userName, id: userId })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComp);