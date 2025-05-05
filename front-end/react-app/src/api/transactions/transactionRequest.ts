import axios from "axios"
import { CreateTransactionDTO } from './dto/createTransaction.dto.ts';
import { handleError } from "../handleError.ts";
import { TransactionFiltersDTO } from "./dto/transactionFilters.dto.ts";
import { UpdateTransactionDTO } from "./dto/updateTransaction.dto.ts";


const baseUrl = `/api/transaction`;


export const getSummury = async() => {
    try{
        const response = await axios({
            url: `${baseUrl}/monthSummary`,
            method: "GET",
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        return response.data;
    }catch (error){
        handleError(error, 'A problem occurred while the summary was requested');
        return null;
    }
}


export const createTransaction = async(transactionData: CreateTransactionDTO) => {
    try{
        const response = await axios({
            url: `${baseUrl}/`,
            method: "POST",
            data: transactionData,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        return response.data;
    }catch (error){
        handleError(error, 'A problem occurred while the transaction was created');
        return null;
    }
}


export const findWithFilters = async(transactionFiltersData: TransactionFiltersDTO) => {
    try{
        const response = await axios({
            url: `${baseUrl}/filtered`,
            method: "POST",
            data: transactionFiltersData,
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        return response.data;
    }catch (error){
        handleError(error, 'A problem occurred while all transaction were searched');
        return null;
    }
}


export const deleteTransaction = async (id: string) => {
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
      handleError(error, "A problem occurred while trying to delete the transaction");
      return null;
    }
  };
  

  export const updateTransaction = async (updateTransactionData: UpdateTransactionDTO) => {
    try {
      const response = await axios({
        url: `${baseUrl}/update`, 
        method:"PATCH",
        data: updateTransactionData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error, "A problem occurred while trying to update the transaction");
      return null;
    }
  };


  export const findWithFiltersAnalytics = async (transactionFiltersData: TransactionFiltersDTO) => {
    try {
      const response = await axios({
        url: `${baseUrl}/analytics/filtered`, 
        method:"POST",
        data: transactionFiltersData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error, "A problem occurred while trying to get info for analytics");
      return null;
    }
  };