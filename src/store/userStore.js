import { logoutUser } from "@/actions/userAuthActions";
import { fetchUser } from "@/services/userService";
import { create } from "zustand";


export const useUserStore = create((set) => ({
    user: null,

    fetchUser: async () => {
        try {
            const response = await fetchUser();
            set({ user: response.data.user });
        } catch (error) {
            console.error("Failed to fetch user details:", error);
            set({ user: null });
        }
    },


    logoutUser: async (router) => {
        try {
            await logoutUser();
            set({ user: null });
            router.push("/user/login");

            alert("You have been successfully logged out.");

        } catch (error) {
            console.error("Logout failed:", error);
            alert("An unexpected error occurred")
        }
    },

    loginUser: async (router) => {
        router.push("/user/login");
    },


}));
// logoutUser: async (router) => {
//     try {
//         const response = await logoutUser();
//         set({ user: null });
//         router.push("/user/login");
//         alert(response.data.message);

//     } catch (error) {
//         console.error("Logout failed:", error);
//         alert(error.response?.data?.message || "An unexpected error occurred")
//     }
// },