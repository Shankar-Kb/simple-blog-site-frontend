import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import CreateBlog from './components/CreateBlog'

function App() {

  return (
    <Router>
        <Switch>
            <Route exact path='/' render = {(props) => {
                return (
                    <HomePage {...props} />
                );
            }} />
            <Route exact path='/login' render = {(props) => {
                return (
                    <LoginPage {...props} />
                )
            }} />
            <Route path='/signup' render = {(props) => {
                return (
                    <SignupPage {...props} />
                )
            }} />
            <Route path='/create' render = {(props) => {
                return (
                    <CreateBlog {...props} />
                )
            }} />
        </Switch>
    </Router>
);
  
}

export default App;