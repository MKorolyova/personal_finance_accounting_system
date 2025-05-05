
import React  from 'react';
import { useState, useEffect } from "react";
import { LogIn } from "../components/LogIn.tsx";
import { SignUp } from "../components/SignUp.tsx";
import { AddTransaction } from "../components/AddTransaction.tsx";
import { AddGoal } from "../components/AddGoal.tsx"
import { getSummury } from '../api/transactions/transactionRequest.ts';
 
export const Home = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const [showLogInForm, setShowLogInForm] = useState(false); 
  const [showSignUpForm, setShowSignUpForm] = useState(false); 
  const [ShowAddTransactionForm, setShowAddTransactionForm] = useState(false); 
  const [ShowAddGoalForm, setShowAddGoalForm] = useState(false); 
  const [summary, setSummary] = useState({ incomeSum: 0, expenseSum: 0 });


  const handleLogout = () => {
    localStorage.removeItem('access_token'); 
    setIsAuthenticated(false)
  };

  const handleShowLogInForm = (e) =>{
    setShowLogInForm(true)
    setShowSignUpForm(false)
  }

  const handleShowAddTransactionForm = (e) =>{
    setShowAddTransactionForm(true)
  }

  const handleShowAddGoalForm = (e) =>{
    setShowAddGoalForm(true)
  }

  const refreshSummary = async () => {
    const response = await getSummury();
    if (response) {
      setSummary({
        incomeSum: response.incomeSum,
        expenseSum: response.expenseSum
      });
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      refreshSummary();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {

    return (
      <main className="main">

        {showLogInForm && !showSignUpForm && (
            <LogIn  setShowLogInForm={setShowLogInForm} setShowSignUpForm={setShowSignUpForm} setIsAuthenticated={setIsAuthenticated} /> 
        )}

        {!showLogInForm && showSignUpForm && (
            <SignUp  setShowLogInForm={setShowLogInForm} setShowSignUpForm={setShowSignUpForm} setIsAuthenticated={setIsAuthenticated}/> 
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

  }

  return (
    <main className="main">
      <div className="home-page">
        <h1>Welcome back!</h1>

        <button className="accent-button" onClick={handleLogout}>
                Log Out
        </button>

        <div className="statistic">
          <h2 className="title">Month Statistic</h2>
          <div className="statistic-items">

            <div className="stat-item">
              <h2>Expenses:</h2>
              <p>$ {summary.expenseSum}</p>
            </div>

            <div className='separator'>  </div>

            <div className="stat-item">
              <h2>Income:</h2>
              <p>$ {summary.incomeSum}</p>
            </div>

          </div>
        
        </div>

        <div className="actions">
          {!ShowAddTransactionForm && (
                <button className="accent-button" onClick={handleShowAddTransactionForm}>
                Add Transaction
                </button>
            )}

            {ShowAddTransactionForm &&  (
               <AddTransaction  setShowAddTransactionForm={setShowAddTransactionForm} refreshSummary={refreshSummary} refreshTransactions={null} /> 
            )}

            {!ShowAddGoalForm && (
                <button className="accent-button" onClick={handleShowAddGoalForm}>
                Add Goal
                </button>
            )}
         
            {ShowAddGoalForm &&  (
               <AddGoal  setShowAddGoalForm={setShowAddGoalForm} refreshGoals={null}/> 
            )}

        </div>
      </div>
    </main>
  );
};
