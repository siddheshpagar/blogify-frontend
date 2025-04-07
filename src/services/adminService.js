import axios from "axios";
import { BASE_URL } from "./APIConstant"
import getAuthAdminHeader from "./authAdminHeader";

// Function to fetch all users from the backend
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/users`,
      getAuthAdminHeader()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to send block/unblock status of the user to backend
export const setBlockStatus = async ({ userId, isBlocked }) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/set-block-status/${userId}`,
      { isBlocked: !isBlocked },
      getAuthAdminHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// function to fetch details of the currently logged-in admin from backend
export const fetchAdmin = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/details`,
      getAuthAdminHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );
    // console.log( response.data.admin);

    return response;
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

// Function to log out the admin
export const logoutAdmin = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/logout`,
      {},
      getAuthAdminHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );

    return response;
  } catch (error) {
    throw error;
  }
}