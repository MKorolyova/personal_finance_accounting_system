
import React  from 'react';
import { useState, useEffect } from "react";
import { LogIn } from "../components/LogIn.tsx";
import { SignUp } from "../components/SignUp.tsx";

 
export const HomePublic = () => {

  
  const [showLogInForm, setShowLogInForm] = useState(false); 
  const [showSignUpForm, setShowSignUpForm] = useState(false); 


  const handleShowLogInForm = (e) =>{
    setShowLogInForm(true)
    setShowSignUpForm(false)
  }

    return (
      <main className="main">

        {showLogInForm && !showSignUpForm && (
            <LogIn  setShowLogInForm={setShowLogInForm} setShowSignUpForm={setShowSignUpForm} /> 
        )}

        {!showLogInForm && showSignUpForm && (
            <SignUp  setShowLogInForm={setShowLogInForm} setShowSignUpForm={setShowSignUpForm} /> 
        )}

        <div className="welcome-banner">
          <img className="welcome-banner-image" src="/finance-image.png" alt="Finance illustration" />

          <div className="welcome-banner-text">
            <h1>Manage Your Personal Finances Easily</h1>
            <p>Track your expenses, set savings goals, and plan your future with our powerful and easy-to-use system.</p>
            {!showLogInForm && !showSignUpForm && (
                <button className="accent-button" onClick={handleShowLogInForm}>
                Log In
                </button>
            )}

          </div>
        </div>
      </main>
    );


};
