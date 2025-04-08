import axios from 'axios';
import { BASE_URL } from './APIConstant';
import getAuthAdminHeader from './authAdminHeader';

// API call to register a new admin
export const adminSignUp = async (adminRegistrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin`, adminRegistrationData);
    return response;
  } catch (error) {
    throw error;
  }
};

// API call for admin login
export const adminLogin = async (adminLoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`,
      adminLoginData,
      getAuthAdminHeader()
    );

    return response;
  } catch (error) {
    throw error;
  }
};