import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';

const SignupPage = () => {
    const history = useHistory();
    let [name, setName] = useState("");
    let [mail, setMail] = useState("");
    let [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [buttonHidden, setButtonHidden] = useState(false);
    
    useEffect(() => {
      //console.log("Component Did Mount - SignupPage")
    }, []);
  
    useEffect(() => {
      if(name.length > 0 && mail.length > 0 && password.length > 0 && confirmPassword.length > 0){
        setButtonHidden(false);
      }else{
        setButtonHidden(true);
      }
    }, [name, mail, password])
  
    const handleSignup = () => {

      if(password === confirmPassword){
      fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: mail,
          password: password,
          role: 'basic',
        })
      }).then((res) => res.json())
      .then((res) => {
        console.log(res);

        if(res.userEmail){
        setName="";
        setMail="";
        setPassword="";
        setButtonHidden(false);
        setMessage("Account successfully registered. You will be redirected to the login page");
        setTimeout(()=>{ history.push("/login") }, 3000);
        }

        if(res.errors.email) setMessage(res.errors.email)
        if(res.errors.password) setMessage(res.errors.password)
      })
      .catch(err => console.log(err));
      }
      else setMessage("The two passwords must match");
    }
  
    return (
      <div className="signup-box">
        
        <label htmlFor="name" className="input-group">
          Enter your name :{" "}
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <br />
        <label htmlFor="mail" className="input-group mt-2">
        Enter your mail :{" "}
        </label>
        <input
          type="text"
          id="mail"
          className="form-control"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Enter your email"
        />
        <br />

        <label htmlFor="password" className="input-group mt-2">
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
        <label htmlFor="confirm-password" className="input-group mt-2">
        Confirm your password:{" "}
      </label>
      <input
        type="password"
        id="confirm-password"
        className="form-control"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your passowrd"
      />

        <div className="error-box mt-3 mx-auto">{message}</div>
        <button type="button" disabled={buttonHidden} className="btn btn-outline-dark mx-auto mt-3" onClick={handleSignup}>
          Signup
        </button>
      </div>
    );
  };
  
  export default SignupPage;