import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const LoginPage = () => {

  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonHidden, setButtonHidden] = useState(false);

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  
  useEffect(() => {
    //console.log("Component Did Mount - LoginPage")
    if(isLoggedIn) history.push('/');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      //userLoggedIn(res.userEmail, res.userName, res.userId, res.userRole);
      dispatch({ type: 'LOGIN', mail: res.userEmail, name: res.userName, id: res.userId, role: res.userRole });
      setMail("");
      setPassword("");
      setButtonHidden(false);
      history.push('/');
      }
    })
    .catch(err => console.log(err));
  }

  const handleForgotPassword = () => {
        history.push('/forgot-password');
  }

  return (
    <div className="login-box">
      
      <label htmlFor="target" className="input-group mt-3">
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

      <label className="input-group mt-3" htmlFor="password">
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
      <div className="buttons-box mt-3">
      <button type="button" className="btn btn-outline-dark mr-1" onClick={handleForgotPassword}>
          Forgot Password
        </button>
      <button type="button" disabled={buttonHidden} className="btn btn-outline-dark ml-1" onClick={handleLogin}>
        Login
      </button>
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     userLoggedIn: (userEmail, userName, userId, userRole) => dispatch({ type: 'LOGIN', mail: userEmail, name: userName, id: userId, role: userRole })
//   }
// }

// export default connect(mapDispatchToProps)(LoginPage);
export default LoginPage;