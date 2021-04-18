import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import CreateBlog from './components/CreateBlog'
import NavbarComp from './components/NavbarComp'
import UserBlogs from './components/UserBlogs'
import BlogDetailsPage from './components/BlogDetailsPage'
import AdminPanel from './components/AdminPanel'
import ForgotPasswordComp from './components/ForgotPasswordComp'
import ResetPasswordComp from './components/ResetPasswordComp'
import './App.css';

function App() {

  return (
    <div className="app-box">
    <Router>
        
        <NavbarComp />
        <Switch>
            <Route exact path='/login' render = {(props) => {
                return (
                    <LoginPage {...props} />
                )
            }} />
            <Route exact path='/signup' render = {(props) => {
                return (
                    <SignupPage {...props} />
                )
            }} />
            <Route exact path='/create-blog' render = {(props) => {
                return (
                    <CreateBlog {...props} />
                )
            }} />
            <Route exact path='/user-blogs' render = {(props) => {
                return (
                    <UserBlogs {...props} />
                )
            }} />
            <Route exact path='/blog/:id' render = {(props) => {
                return (
                    <BlogDetailsPage {...props} />
                )
            }} />
            <Route exact path='/admin-panel' render = {(props) => {
                return (
                    <AdminPanel {...props} />
                )
            }} />
            <Route exact path='/forgot-password' render = {(props) => {
                return (
                    <ForgotPasswordComp {...props} />
                )
            }} />
            <Route exact path='/reset-password/:id' render = {(props) => {
                return (
                    <ResetPasswordComp {...props} />
                )
            }} />
            <Route exact path='/' render = {(props) => {
                return (
                    <HomePage {...props} />
                );
            }} />
        </Switch>
        
    </Router>
    </div>
);
  
}

export default App;