// utils/authHeader.js
import Cookies from "js-cookie";

const getAuthAdminHeader = () => {
    // Get jwt from cookies
    const token = Cookies.get('adminToken');
    return {
        // send token inside header
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export default getAuthAdminHeader;
