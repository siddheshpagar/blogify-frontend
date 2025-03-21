"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
    cookies().delete("userToken"); // Deletes the userToken cookie
}

export async function isUserLoggedIn() {
    return cookies().has("userToken");
}