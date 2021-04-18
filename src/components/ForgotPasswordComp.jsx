import React, { useState, useEffect } from "react";
import './ForgotPasswordComp.css';

const ForgotPasswordComp = () => {

  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [buttonHidden, setButtonHidden] = useState(false);

  
  useEffect(() => {
    if(mail.length > 0){
      setButtonHidden(false);
    }else{
      setButtonHidden(true);
    }
  }, [mail])


  const handleForgotPassword = () => {

    fetch(`${process.env.REACT_APP_SERVER_URL}/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email: mail
      })
    }).then((res) => res.json())
    .then((res) => {

      console.log(res);

      if(res.message){
      setMessage(res.message);
      setMail("");
      setButtonHidden(false);
      }
      else if(res.error){
      setMessage(res.error);
      setMail("");
      setButtonHidden(false);
      }
    })
    .catch(err => {
      console.log(err)
    });
  }

  return (
    <div className="forgot-password-box">
      
      <label htmlFor="target" className="input-group mt-3">
        Enter your registered mail address:{" "}
      </label>
      <input
        type="text"
        id="target"
        className="form-control"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        placeholder="Enter your email"
      />

      <div className="error-box mt-3 mx-auto">{message}</div>

      <div className="buttons-box mt-1">
      <button type="button" disabled={buttonHidden}  className="btn btn-outline-dark mr-1" onClick={handleForgotPassword}>
          Check Email
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordComp;