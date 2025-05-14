
import React  from 'react';
import { useState, useEffect } from "react";
import { AddTransaction } from "../components/AddTransaction.tsx";
import { AddGoal } from "../components/AddGoal.tsx"
import { getSummury } from '../api/transactions/transactionRequest.ts';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
 
export const HomePrivate = () => {

  const [ShowAddTransactionForm, setShowAddTransactionForm] = useState(false); 
  const [ShowAddGoalForm, setShowAddGoalForm] = useState(false); 
  const [summary, setSummary] = useState({ incomeSum: 0, expenseSum: 0 });
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('access_token'); 
    navigate('/', { replace: true });
  };

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
    refreshSummary();
  },[]);


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
