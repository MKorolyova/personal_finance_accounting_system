import React  from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CreateGoalDTO } from '../api/goals/dto/createGoal.dto.ts';
import { createGoal } from '../api/goals/goalRequest.ts';

export const AddGoal = ({ setShowAddGoalForm, refreshGoals }) => {

  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState("0"); 
  const [goalName, setGoalName] = useState('');
  const [status, setStatus] = useState('in progress'); 
  const [deadline, setDeadline] = useState('');



  const handleAddGoal = async(e) => {
    e.preventDefault();
    
    const goalData: CreateGoalDTO = {
      targetAmount: parseFloat(targetAmount),
      currentAmount:parseFloat(currentAmount),
      goalName:goalName,
      status:status,
      deadline: deadline,
    };


  
      
    const response = await createGoal(goalData);

     if(response){
      
      if (refreshGoals) {
        await refreshGoals();
      }
  
      setShowAddGoalForm(false);
    }
  };
  
    
  return (

    <div className="form">
        <button className="close-button" type="button" onClick={() => setShowAddGoalForm(false)}>
          x
        </button>
      <h2 className='form-header'>New Goal</h2>
      <form onSubmit={handleAddGoal}>

        <div className='form-item'>
          <p>Goal Name:</p>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />
        </div>

        <div className='form-item'>
          <p>Current Amount:</p>
          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            required
          />
        </div>

        <div className='form-item'>
          <p>Target Amount:</p>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
        </div>

        <div className='form-item'>
          <Calendar
            value={deadline}
            onChange={(value) => setDeadline((value as Date).toISOString())}
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



