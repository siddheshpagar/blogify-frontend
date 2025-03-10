import axios from 'axios';
import { BASE_URL } from './APIConstant';

// API call to register a new user
export const userSignUp = async (registrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, registrationData);
    return response;
  } catch (error) {
    throw error;
  }
};

// API call for user login
export const userLogin = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`,
      loginData,
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};