import { useState } from 'react';
import React  from 'react';
import {logIn} from "../api/authRequest.ts"
import { useNavigate } from 'react-router-dom';




export const LogIn = ({ setShowLogInForm, setShowSignUpForm, }) => {//setIsAuthenticated

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await logIn({
      email,
      password
    });
  
    if (response) {
      setShowSignUpForm(false);
      setShowLogInForm(false);
      navigate('/Home', { replace: true });
    }
  };
  

  const handleShowSignUpForm = (e) =>{
    setShowSignUpForm(true)
    setShowLogInForm(false)
  }


  return (

    <div className="form">
        <button className="close-button" type="button" onClick={() => setShowLogInForm(false)}>
          x
        </button>
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
