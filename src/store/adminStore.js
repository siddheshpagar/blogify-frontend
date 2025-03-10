import { logoutAdmin } from "@/actions/adminAuthActions.js";
import { fetchAdmin } from "@/services/adminService";
import { create } from "zustand";


export const useAdminStore = create((set) => ({
    admin: null,

    fetchAdmin: async () => {
        try {
            const response = await fetchAdmin();
            // console.log("called for sid" + response.data.admin.name);
            set({ admin: response.data.admin });
        } catch (error) {
            console.error("Failed to fetch admin details:", error);
            set({ admin: null });
        }
    },


    logoutAdmin: async (router) => {
        try {
            await logoutAdmin();
            set({ admin: null });
            router.push("/admin/login");

            alert("You have been successfully logged out.");

        } catch (error) {
            console.error("Logout failed:", error);
            alert("An unexpected error occurred")
        }
    },

    loginAdmin: async (router) => {
        router.push("/admin/login");
    },


}));
// logoutAdmin: async (router) => {
//     try {
//         const response = await logoutAdmin();
//         set({ admin: null });
//         router.push("/admin/login");
//         console.log("loog");
//         alert(response.data.message);

//     } catch (error) {
//         console.error("Logout failed:", error);
//         alert(error.response?.data?.message || "An unexpected error occurred")
//     }
// },
// isAdminLoggedIn: false,
// setAdminLoggedIn: (value) => set({ isAdminLoggedIn: value }),
