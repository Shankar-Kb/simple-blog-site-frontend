import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';

const SignupPage = () => {
    const history = useHistory();
    let [name, setName] = useState("");
    let [mail, setMail] = useState("");
    let [password, setPassword] = useState("");
    const [buttonHidden, setButtonHidden] = useState(false);
    
    useEffect(() => {
      //console.log("Component Did Mount - SignupPage")
    }, []);
  
    useEffect(() => {
      if(name.length > 0 && mail.length > 0 && password.length > 0){
        setButtonHidden(false);
      }else{
        setButtonHidden(true);
      }
    }, [name, mail, password])
  
    const handleSignup = () => {
      fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: mail,
          password: password,
        })
      }).then((res) => res.json())
      .then((res) => {
        console.log(res);

        if(res.userEmail){
        setName="";
        setMail="";
        setPassword="";
        setButtonHidden(false);
        history.push("/");
        }
      })
      .catch(err => console.log(err));
    }
  
    return (
      <div className="signup-box">
        
        <label htmlFor="target" className="input-group">
          Enter your name :{" "}
        </label>
        <input
          type="text"
          id="target"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <br />
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
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="Enter your password"
        />
        <br />
        <button type="button" disabled={buttonHidden} className="btn btn-dark" onClick={handleSignup}>
          Signup
        </button>
      </div>
    );
  };
  
  export default SignupPage;