import axios from "axios";
import { BASE_URL } from "./APIConstant";
import getAuthUserHeader from "./authUserHeader";

// function to fetch details of the currently logged-in user from backend
export const fetchUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/details`,
      getAuthUserHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );

    return response;
  } catch (error) {
    throw error;
  }
}

// Function to log out the user
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/user/logout`,
      {},
      getAuthUserHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );

    return response;
  } catch (error) {
    throw error;
  }
}

// Function to hit API with a new blog
export const uploadBlog = async ({ title, description, category, author, image }) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('author', author);
    formData.append('image', image);

    const response = await axios.post(`${BASE_URL}/blog`,
      formData,
      getAuthUserHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );
    console.log("successfuuu");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// API call to fetch all blogs
export const fetchAllBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blog`,
      getAuthUserHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// API call to fetch blogs created by the logged-in user
export const fetchUserBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/user`,
      getAuthUserHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// API call to delete a blog by its id
export const deleteUserBlogById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/blog/deleteblog/${id}`,
      getAuthUserHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// function to call API to fetch a single blog by its ID 
export const fetchBlogById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/${id}`,
      getAuthUserHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// function to call API to edit a blog by its ID it updates an existing blog
export const editBlogById = async (id, updatedBlog) => {
  try {
    const formData = new FormData();
    formData.append('title', updatedBlog.title);
    formData.append('description', updatedBlog.description);
    formData.append('category', updatedBlog.category);
    formData.append('author', updatedBlog.author);
    formData.append('image', updatedBlog.image);

    const response = await axios.put(`${BASE_URL}/blog/${id}`,
      formData,
      getAuthUserHeader()
      // {
      //   withCredentials: true, // Include cookies in the request
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
}