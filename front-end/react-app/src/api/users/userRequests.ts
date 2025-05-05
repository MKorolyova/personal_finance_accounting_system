import axios from "axios"

const baseUrl = `http://localhost:3000/api/user/`

export const getUser = async() => {
    try{
        const response = axios({
            url: `${baseUrl}/profile`,
            method: "GET",

        })
    }catch (error){

    }
}