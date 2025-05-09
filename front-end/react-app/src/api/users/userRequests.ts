import axios from "axios"

const baseUrl = `api/user/`

export const getUser = async () => {
    try {
      const response = await axios({
        url: `${baseUrl}/profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
  
      const access_token = response.data.access_token;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
      }
  
      return { status: response.status, data: response.data };
    } catch (error) {
      return { status: error.response?.status || 500, error };
    }
  };