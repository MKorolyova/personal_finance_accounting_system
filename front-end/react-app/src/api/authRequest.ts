import axios from "axios"
import { LogInDTO } from "../dto/logIn.dto";
import {SignUpDTO } from "../dto/signUp.dto"
import { handleError } from "./handleError.ts";

const baseUrl = `/api/auth`;


export const signUp = async(signUpData: SignUpDTO) => {
    try{
        const response = await axios({
            url: `${baseUrl}/signUp`,
            method: "POST",
            data: signUpData

        });

        const access_token = response.data.access_token;
        if (access_token) {
          localStorage.setItem('access_token', access_token);
        }
        return response.data;
    }catch (error){
        handleError(error, 'Sign up failed');
        return null;
    }
}

  export const logIn = async (logInData: LogInDTO) => {
    try{
        const response = await axios({
            url: `${baseUrl}/logIn`,
            method: "POST",
            data: logInData
        });
        const access_token = response.data.access_token;
        if (access_token) {
          localStorage.setItem('access_token', access_token);
        }
        return response.data;
    } catch (error){
        handleError(error, 'Log In failed');
        return null;
    }
};