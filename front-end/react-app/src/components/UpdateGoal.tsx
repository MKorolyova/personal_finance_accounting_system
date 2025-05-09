import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { UpdateGoalDTO } from '../api/goals/dto/updateGoal.dto.ts';
import { updateGoal } from '../api/goals/goalRequest.ts';

export const UpdateGoal = ({ refreshGoals, setShowUpdateGoalForm, goal }) => {

  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState("0");
  const [goalName, setGoalName] = useState('');
  const [status, setStatus] = useState('in progress');
  const [deadline, setDeadline] = useState('');

  const statuses = ['in progress', 'completed'];

  useEffect(() => {
    if (goal) {
      setTargetAmount(goal.targetAmount);
      setCurrentAmount(goal.currentAmount);
      setGoalName(goal.goalName);
      setStatus(goal.status);
      setDeadline(goal.deadline);
    }
  }, [goal]);

  const handleUpdateGoal = async(e) => {
    e.preventDefault();

    const updateGoalData: UpdateGoalDTO = {
      id: goal.id,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      goalName: goalName,
      status: status,
      deadline: deadline,

    };
    
    if (updateGoalData === goal){
      setShowUpdateGoalForm(false);
      return;
    }

    const response = await updateGoal(updateGoalData)
    if (response){
      refreshGoals();
    }

    setShowUpdateGoalForm(false);
    
  };

  return (

    <div className="form">
        <button className="close-button" type="button" onClick={() => setShowUpdateGoalForm(false)}>
          x
        </button>
      <h2 className='form-header'>Edit Goal</h2>
      <form onSubmit={handleUpdateGoal}>
  
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
          <p>Deadline:</p>
          <Calendar
            value={deadline}
            onChange={(value) => setDeadline((value as Date).toISOString())}
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
