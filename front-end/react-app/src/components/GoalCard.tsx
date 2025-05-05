import React  from 'react';
import { deleteGoal } from '../api/goals/goalRequest.ts';

export const GoalCard = ({goal, refreshGoals, setSelectedGoal, setShowUpdateGoalForm}) => {

    const handleEdit = () => {
        setSelectedGoal(goal)
        setShowUpdateGoalForm(true)
        console.log('Edit:', goal);
    };

    const handleDelete = async () => {

          const response = await deleteGoal(goal.id);
          if (response) {
            await refreshGoals();
          }
       
    };

    let progress = (goal.currentAmount / goal.targetAmount) * 100;
    if (progress > 100){
      progress =100;
    }
    return(
      <div className="card">
          <div className="info">
              <div className="general-info">
                  <h2 className="title"> {goal.goalName} {goal.status}</h2>
                  <p className="subtitle">{goal.deadline.split('T')[0]}</p> 
              </div>

              <div className="card-actions">
                <button className="card-actions-button" onClick={handleEdit}>Edit</button>
                <button className="card-actions-button" onClick={handleDelete}>Delete</button>
              </div>
          </div>

          <div className="progress-bar-container">
              <div className="progress-bar"></div>
              <div className="progress-point" style={{ left: `${progress}%`}}></div>
          </div>

          <div className="limits">
            <div className='text'>{goal.currentAmount}$</div>
            <div className='text'>{goal.targetAmount}$</div>
          </div>
      </div>

    )
}







