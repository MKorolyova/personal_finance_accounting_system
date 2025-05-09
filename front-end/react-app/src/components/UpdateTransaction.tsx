import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { updateTransaction } from '../api/transactions/transactionRequest.ts';
import { UpdateTransactionDTO } from '../api/transactions/dto/updateTransaction.dto.ts';
import {transactionCategories} from "../api/transactions/enums/transactionCategories.ts"
import {transactionTypes} from "../api/transactions/enums/transactionTypes.ts"
import { GoalDTO } from '../api/goals/dto/goal.dto.ts';
import { findGoals } from '../api/goals/goalRequest.ts';

export const UpdateTransaction = ({ setShowUpdateTransactionForm , refreshTransactions , transaction }) => {
 
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [userGoals, setUserGoals] = useState<GoalDTO[]>([]);
  const [isGoalCategory, setIsGoalCategory] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      const goals = await findGoals();
      if (goals) {
        setUserGoals(goals);
      }
    };
  
    fetchGoals();
  }, []);


  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setType(transaction.type);
      setCategory(transaction.category);
      setDescription(transaction.description);
      setTransactionDate(transaction.transactionDate);
    }
  }, [transaction]);

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
   
    const updateTransactionData: UpdateTransactionDTO = {
      id: transaction.id,
      amount: parseFloat(amount),
      type,
      category,
      description,
      transactionDate: transactionDate,
    };

    
    if (updateTransactionData === transaction){
      setShowUpdateTransactionForm(false);
      return;
    }

    const response = await updateTransaction(updateTransactionData)
    if (response){
      refreshTransactions();
    }

    setShowUpdateTransactionForm(false);

  };

  return (
    <div className="form">
        <button className="close-button" type="button" onClick={() => setShowUpdateTransactionForm(false)}>
          x
        </button>
      <h2 className='form-header'>Edit Transaction</h2>
      <form onSubmit={handleUpdateTransaction}>

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
                className={category === c && !isGoalCategory ? 'selected-button button' : 'unselected-button button'}
                onClick={() => {
                  setCategory(c);
                  setType(''); 
                  setIsGoalCategory(false);
                }}>
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
                className={category === goal.goalName &&  isGoalCategory ? 'selected-button button' : 'unselected-button button'}
                onClick={() =>{
                  setCategory(goal.goalName)
                  setType('goal'); 
                  setIsGoalCategory(true);
                }}>
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
          Save Changes
        </button>
      </form>
    </div>
  );
};
