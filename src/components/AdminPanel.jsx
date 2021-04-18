import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from "react-bootstrap";

const AdminPanel = ({userRole}) => {

    const [users, setUsers] = useState([]);
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleModalClose = () => setShow(false);
    const handleModalShow = () => setShow(true);

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const showUsers = () => {
          
          if(userRole !== 'admin') history.push('/login');
          fetch(`${process.env.REACT_APP_SERVER_URL}/show-users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            credentials: "include",
            body: JSON.stringify({
                role: userRole
              })
        })
        .then((res) => res.json())
        .then((res) => {
            //console.log(res);
            setUsers(res);
        })
        .catch((error) => console.log(error))
    }

    const handleEditToggle = (id, name, email) => {
          
        setUserId(id);
        setUserName(name);
        setUserEmail(email);
        handleModalShow();
        //console.log(id);
  }

  const handleEditSave = (id) => {
        
      fetch(`${process.env.REACT_APP_SERVER_URL}/edit-user/${id}`, {
          
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
              name: userName,
              email: userEmail,
              role: userRole
            })
      })
      .then((res) => res.json())
      .then((res) => {
          handleModalClose();
          showUsers(); 
      })

  }

  const handleUserDelete = (id) => {
      
      fetch(`${process.env.REACT_APP_SERVER_URL}/delete-user/${id}`, {

          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
              role: userRole
            })
      })
      .then((res) => res.json())
      .then((res) => {
          showUsers(); 
      })
  }

    useEffect( showUsers, [userRole, history]);

    return (
        <div className="container-fluid users-box col-6 offset-3">
            <h2 className="text-center mb-3">Registered Users</h2>
            {users.map((elem, index) => (
                <div key={index} className="user-box card card-body">
                    <p>{elem.name}<br />
                       {elem.email}</p>
                    <div className="blogs-buttons-box">
                        <button type="button" className="btn btn-dark mr-1" onClick={() => { handleEditToggle(elem._id, elem.name,  elem.email) }}>Edit</button>
                        <button type="button" className="btn btn-dark ml-1" onClick={() => { handleUserDelete(elem._id) }}>Delete</button>
                    </div>
                </div>))}
        
                <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title> Edit your blog </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <label className="input-group" htmlFor="user-name"> User Name :{" "} </label>
                  <input
                    className="form-control"
                    type="text"
                    id="user-name"
                    value={userName}
                    placeholder={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                <label className="input-group" htmlFor="user-email"> User Email :{" "} </label>
                  <input
                    className="form-control"
                    type="text"
                    id="user-email"
                    value={userEmail}
                    placeholder={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-dark" onClick={handleModalClose}>
                        Close
                    </button>
                    <button type="button" className="btn btn-dark" onClick={()=>{ handleEditSave(userId) }}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userRole: state.userRole
    }
  }

export default connect(mapStateToProps)(AdminPanel);