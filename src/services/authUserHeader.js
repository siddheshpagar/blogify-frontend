// utils/authHeader.js
import Cookies from "js-cookie";

const getAuthUserHeader = () => {
    // Get jwt from cookies
    const token = Cookies.get('userToken');
    return {
        // send token inside header
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export default getAuthUserHeader;
