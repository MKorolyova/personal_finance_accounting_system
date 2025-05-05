import React, { useState } from 'react';
import {signUp} from "../api/authRequest.ts"


export const SignUp = ({ setShowLogInForm, setShowSignUpForm, setIsAuthenticated}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await signUp({
      email:email,
      username: name,
      password:password
    })
    if (result) {
      setIsAuthenticated(true);
      setShowSignUpForm(false);
      setShowLogInForm(false);
    } else {
      setIsAuthenticated(false);
    }
  };


  const handleShowLogInForm = (e) =>{
    setShowSignUpForm(false)
    setShowLogInForm(true)
  }


  return (
    
    <div className="form">
      <h2 className='form-header'>Sign Up</h2>
      <form onSubmit={handleSignUp}>

        <div className='form-item'>
          <p >Name:</p>
          <input
            type="string"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='form-item'>
          <p >Email:</p>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-item'>
          <p >Password:</p>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="accent-button" type="submit">
          Sign Up
        </button>
      </form>

      <div className="form-footer">

            <p>Do have an account?</p>
            <button className="accent-button" onClick={handleShowLogInForm}>
              Log In
            </button>

      </div>
    </div>
  );
};
