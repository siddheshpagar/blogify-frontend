import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

export default function LogoutButtonFunctionality() {
    const cookieStore = cookies();
    const userToken = cookieStore.get("adminToken");

    return <LogoutButton isLoggedIn={!!userToken} />;
}
