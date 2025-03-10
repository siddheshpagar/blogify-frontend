"use server";

import { cookies } from "next/headers";

export async function logoutAdmin() {
    cookies().delete("adminToken"); // Deletes the adminToken cookie
}

export async function isAdminLoggedIn() {
    return cookies().has("adminToken");
}