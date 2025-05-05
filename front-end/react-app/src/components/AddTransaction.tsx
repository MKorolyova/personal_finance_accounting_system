import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createTransaction, findWithFilters } from '../api/transactions/transactionRequest.ts';
import { CreateTransactionDTO } from '../api/transactions/dto/createTransaction.dto.ts';
import {transactionCategories} from "../api/transactions/enums/transactionCategories.ts"
import {transactionTypes} from "../api/transactions/enums/transactionTypes.ts"
import {GoalDTO} from "../api/goals/dto/goal.dto.ts"
import { findGoals } from '../api/goals/goalRequest.ts';

export const AddTransaction = ({ setShowAddTransactionForm, refreshSummary, refreshTransactions }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [userGoals, setUserGoals] = useState<GoalDTO[]>([]);


  useEffect(() => {
    const fetchGoals = async () => {
      const goals = await findGoals();
      if (goals) {
        setUserGoals(goals);
      }
    };
  
    fetchGoals();
  }, []);

  const handleAddTransaction = async(e) => {
    e.preventDefault();
      
    const transactionData: CreateTransactionDTO = {
      amount: parseFloat(amount),
      type,
      category,
      description,
      transactionDate: transactionDate,
    };
    
    console.log('Transaction form:', transactionData);
    
    const response = await createTransaction(transactionData);
    console.log("response", response)
     if(response){
      
      if (refreshTransactions) {
        await refreshTransactions();
      }
  
      if (refreshSummary) {
        await refreshSummary();
      }
      setShowAddTransactionForm(false);
    }

  };

  return (
    <div className="form">
      <h2 className='form-header'>New Transaction</h2>

      <form onSubmit={handleAddTransaction}>

        <div className='form-item'>
          <p>Amount:</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className='form-item'>
          <p>Type:</p>
          <div className="button-group">
            {transactionTypes.map((t) => (
              <button
                key={t}
                type="button"
                className={type === t ? 'selected-button' : 'unselected-button'}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className='form-item'>
          <p>Category:</p>
          <div className="button-group">
            {transactionCategories.map((c) => (
              <button
                key={c}
                type="button"
                className={category === c ? 'selected-button button' : 'unselected-button button'}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <p>Goal Category:</p>
          <div className="button-group">
            {userGoals.map((goal) => (
              <button
                key={goal.goalName}
                type="button"
                className={category === goal.goalName ? 'selected-button button' : 'unselected-button button'}
                onClick={() => setCategory(goal.goalName)}
              >
                {goal.goalName}
              </button>
            ))}
          </div>
        </div>

        <div className='form-item'>
          <p>Description:</p>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='form-item'>
          <p>Date:</p>
          <Calendar
            value={transactionDate}
            onChange={(value) => setTransactionDate((value as Date).toISOString())}
            view="month"
          />

        </div>

        <button className="accent-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
