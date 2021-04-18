import React, { useState, useEffect } from "react";
import './ResetPasswordComp.css';

const ResetPasswordComp = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [buttonHidden, setButtonHidden] = useState(false);
  const [allow, setAllow] = useState(false);

  
  useEffect(() => {
    if(password.length > 0){
      setButtonHidden(false);
    }else{
      setButtonHidden(true);
    }
  }, [password])

  useEffect(() => {
    const urlString = window.location.href;
    const url = new URL(urlString);
  
    if(url.searchParams.get("jwt")) {
      setToken(url.searchParams.get("jwt"))
      setAllow(true);
    }

}, [token])


  const handleResetPassword = () => {

    if(password === confirmPassword){
    fetch(`${process.env.REACT_APP_SERVER_URL}/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        password: password
      })
    }).then((res) => res.json())
    .then((res) => {


      if(res.message){
      setMessage(res.message);
      setPassword("");
      setButtonHidden(false);
      }
      else if(res.error){
      setMessage(res.error);
      setPassword("");
      setButtonHidden(false);
      }
    })
    .catch(err => {
      console.log(err)
    });
   }
   else setMessage("The two passwords must match")
  }

  return (
    <>
    { allow && 
    <div className="reset-password-box">
      
      <label htmlFor="reset-password-input" className="input-group mt-3">
        Enter your new password:{" "}
      </label>
      <input
        type="password"
        id="reset-password-input"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <label htmlFor="reset-confirm-input" className="input-group mt-3">
        Confirm your new password:{" "}
      </label>
      <input
        type="password"
        id="reset-confirm-input"
        className="form-control"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your passowrd"
      />

      <div className="error-box mt-3 mx-auto">{message}</div>

      <div className="buttons-box mt-3">
        <button type="button" disabled={buttonHidden}  className="btn btn-outline-dark mr-1" onClick={handleResetPassword}>
          Change Password
        </button>
      </div>
   
    </div>}
    </>
  );
};

export default ResetPasswordComp;