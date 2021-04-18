import React, { useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

//import Cookies from 'universal-cookie';
//const cookies = new Cookies();

function doesHttpOnlyCookieExist(cookiename) {
  const d = new Date();
  d.setTime(d.getTime() + (1000));
  const expires = "expires=" + d.toUTCString();

  document.cookie = cookiename + "=new_value;path=/;" + expires;
  if (document.cookie.indexOf(cookiename + '=') === -1) {
    return true;
  } else {
    return false;
  }
}

const NavbarComp = ({userRole, loggedIn, userLoggedOut, userLoggedIn}) => {

  const history = useHistory();

  useEffect(() => {
    //let cookie = cookies.get("jwt");
    if(doesHttpOnlyCookieExist('jwt')){
    fetch(`${process.env.REACT_APP_SERVER_URL}/login-check`, {
      credentials: "include"})
        .then((res) => res.json())
        .then((res) => {
            //console.log(res);
            if(!res.error){
            userLoggedIn(res.userEmail, res.userName, res.userId, res.userRole);
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
        history.go(0);
        }
      )
      .catch(err => {
        console.log(err)
        history.go(0);
      });
  }


  return (
    <div className="navbar-container">
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/">Simple Blog Site</Link>
        {loggedIn ?
        <div className="navbar-right-box">
        { (userRole==='admin') && <Link className="btn btn-dark" to="/admin-panel">Admin Panel</Link>}
        <Link className="btn btn-dark" to="/create-blog">Create a Blog</Link>
        <Link className="btn btn-dark" to="/user-blogs">My Blogs</Link>
        <button type="button" className="btn btn-dark mt-3 mb-3" onClick={handleLogout}>Logout</button>
        </div> 
          :
          <div className="navbar-right-box">
            <Link className="btn btn-dark" to="/login">Login</Link>
            <Link className="btn btn-dark" to="/signup">Signup</Link>
          </div>}
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.userRole,
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedOut: () => dispatch({type: 'LOGOUT'}),
    userLoggedIn: (userEmail, userName, userId, userRole) => dispatch({type: 'LOGIN', mail: userEmail, name: userName, id: userId, role: userRole })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComp);