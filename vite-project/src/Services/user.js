import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = 'http://localhost:5000';

export async function signup(data) {
    delete data.confirmPassword;
    const response = await axios.post(`${BASE_URL}/sginup`, data);     
    
return response;
}
export async function signim(data) {
    delete data.confirmPassword;
    const response = await axios.post(`${BASE_URL}/sginup`, data);     
    
return response;
}

export function userLogged() {
    const response = axios.get(`${BASE_URL}/me`, 
        { headers: {Authorization: `Bearer ${Cookies.get("token")}`},
  });
  return response;
}