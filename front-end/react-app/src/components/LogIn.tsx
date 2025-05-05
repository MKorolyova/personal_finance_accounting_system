import { useState } from 'react';
import React  from 'react';
import {logIn} from "../api/authRequest.ts"
export const LogIn = ({ setShowLogInForm, setShowSignUpForm, setIsAuthenticated}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await logIn({
      email,
      password
    });
  
    if (response) {
      setIsAuthenticated(true);
      setShowSignUpForm(false);
      setShowLogInForm(false);
    } else {
      setIsAuthenticated(false);
    }
  };
  

  const handleShowSignUpForm = (e) =>{
    setShowSignUpForm(true)
    setShowLogInForm(false)
  }


  return (

    <div className="form">
      <h2 className='form-header'>Login</h2>

      <form onSubmit={handleLogin}>

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

        <button className="accent-button" type="submit" >
          Log In
        </button>
        
      </form>

      <div className="form-footer">

            <p>Don't have an account?</p>
            <button className="accent-button" onClick={handleShowSignUpForm}>
              Sign up
            </button>

      </div>
    </div>
  );
};
