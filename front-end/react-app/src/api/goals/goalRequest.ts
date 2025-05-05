import axios from "axios"
import { CreateGoalDTO } from './dto/createGoal.dto.ts';
import { handleError } from "../handleError.ts";
import { UpdateGoalDTO } from "./dto/updateGoal.dto.ts";


const baseUrl = `/api/goal`;


export const findGoals = async() => {
    try{
        const response = await axios({
            url: `${baseUrl}/`,
            method: "GET",
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        return response.data;
    }catch (error){
        handleError(error, 'A problem occurred while the goal was searched');
        return null;
    }
}


export const createGoal = async(goalData: CreateGoalDTO) => {
    try{
        const response = await axios({
            url: `${baseUrl}/`,
            method: "POST",
            data: goalData,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        return response.data;
    }catch (error){
        handleError(error, 'A problem occurred while the goal was created');
        return null;
    }
}

export const deleteGoal = async (id: string) => {
    try {
      const response = await axios({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error, "A problem occurred while trying to delete the goal");
      return null;
    }
  };
  

  export const updateGoal = async (updateGoalData: UpdateGoalDTO) => {
    try {
      const response = await axios({
        url: `${baseUrl}/update`, 
        method:"PATCH",
        data: updateGoalData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error, "A problem occurred while trying to update the goal");
      return null;
    }
  };


