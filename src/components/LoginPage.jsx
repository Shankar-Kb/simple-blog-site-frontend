import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';

const LoginPage = ({userLoggedIn}) => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonHidden, setButtonHidden] = useState(false);
  
  useEffect(() => {
    //console.log("Component Did Mount - LoginPage")
  }, []);

  useEffect(() => {
    if(mail.length > 0 && password.length > 0){
      setButtonHidden(false);
    }else{
      setButtonHidden(true);
    }
  }, [mail, password])

  const handleLogin = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email: mail,
        password: password,
      })
    }).then((res) => res.json())
    .then((res) => {
      console.log(res);
      
      if(res.userEmail){
      userLoggedIn(res.userEmail, res.userName, res.userId);
      setMail("");
      setPassword("");
      setButtonHidden(false);
      history.push('/');
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="login-box">
      

      <label htmlFor="target" className="input-group">
        Enter your mail :{" "}
      </label>
      <input
        type="text"
        id="target"
        className="form-control"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        placeholder="Enter your email"
      />
      <br />

      <label className="input-group" htmlFor="password">
        Enter your password :{" "}
      </label>
      <input
        className=" form-control"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        placeholder="Enter your password"
      />
      <br />
      <button type="button" disabled={buttonHidden} className="btn btn-dark" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedIn: (userEmail, userName, userId) => dispatch({type: 'LOGIN', mail: userEmail, name: userName, id: userId })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);