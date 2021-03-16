import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();
  let [mail, setMail] = useState("");
  let [password, setPassword] = useState("");
  const [buttonHidden, setButtonHidden] = useState(false);
  
  useEffect(() => {
    console.log("Component Did Mount - LoginPage")
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
      body: JSON.stringify({
        mail: mail,
        password: password,
      })
    }).then((res) => res.json())
    .then((res) => {
      console.log(res);
      setMail="";
      setPassword="";
      setButtonHidden(false);
      history.push('/');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="conttainer-fluid">
      
      <label htmlFor="target" className="input-group">
        Target Mail :{" "}
      </label>
      <input
        type="text"
        id="target"
        className="input-group"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        placeholder="Enter your email"
      />
      <br />
      <label className="input-group" htmlFor="password">
        Password :{" "}
      </label>
      <input
        className=" input-group"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        placeholder="Enter your password"
      />
      <br />
      <button type="button" disabled={buttonHidden} className="btn btn-primary mt-3 mb-3" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;