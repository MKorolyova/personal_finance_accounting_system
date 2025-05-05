import React  from 'react';
import { GoalCard } from "../components/GoalCard.tsx";
import { AddGoal } from "../components/AddGoal.tsx"
import { UpdateGoal } from "../components/UpdateGoal.tsx";
import { useState, useEffect } from 'react';
import {GoalDTO} from '../api/goals/dto/goal.dto.ts'
import { findGoals } from '../api/goals/goalRequest.ts';

export const Goals = () => {

    const [selectedGoal, setSelectedGoal] = useState(null);
    const [showUpdateGoalForm, setShowUpdateGoalForm] = useState(false);
    const [ShowAddGoalForm, setShowAddGoalForm] = useState(false); 

    const [goals, setGoals] = useState<GoalDTO[]>([]);
    useEffect(() => {
        refreshGoals();

    }, []); 

    const refreshGoals = async () => {
    const response = await findGoals();
    if (response) {
        setGoals(response); 
    }
    };
  
  const handleShowAddGoalForm = (e) =>{
    setShowAddGoalForm(true)
  }

  return (
    <main className="main">

        {!ShowAddGoalForm && (
            <button className="accent-button" onClick={handleShowAddGoalForm}>
            Add Goal
            </button>
        )}

        <h1>Goals</h1>

        {ShowAddGoalForm &&  (
            <AddGoal  setShowAddGoalForm={setShowAddGoalForm} refreshGoals={refreshGoals}/> 
        )}

        {showUpdateGoalForm && (
            <UpdateGoal goal={selectedGoal} refreshGoals={refreshGoals} setShowUpdateGoalForm={setShowUpdateGoalForm}/>
        )}

        {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} refreshGoals={refreshGoals} setShowUpdateGoalForm={setShowUpdateGoalForm} setSelectedGoal={setSelectedGoal}/>
        ))}
    </main>
  );
};
