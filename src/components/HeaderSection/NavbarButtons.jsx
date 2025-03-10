"use client"
import { useAdminStore } from '@/store/adminStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';
import { FilePlus, House, LayoutDashboard, List, LogIn, LogOut, Menu, Newspaper, SquareUser, User, X } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';

const NavbarButtons = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user, fetchUser, logoutUser, loginUser } = useUserStore();
    const { admin, fetchAdmin, logoutAdmin, loginAdmin } = useAdminStore();

    // Fetch user and admin details on component mount
    useEffect(() => {
        fetchUser();// Fetch user details when the component mounts
        fetchAdmin(); // Fetch admin details when the component mounts

    }, []);

    // Set initial role based on the URL
    useEffect(() => {
        if (pathname.startsWith("/admin")) {
            setSelectedRole("admin");
        } else {
            setSelectedRole("user");
        }
    }, [pathname]);

    // Handle role change between user and admin
    const handleChange = (value) => {
        setSelectedRole(value);
        if (value === "admin") {
            //    final 3
            router.push("/admin/login");
        } else {
            router.push("/user/login");
        }
    };

    // Routes available for users
    const userRoutes = [
        { name: "Home", path: "/", icon: House },
        { name: "Blogs", path: "/blog", icon: Newspaper },
        { name: "dashboard", path: "/user/dashboard/listblog", icon: LayoutDashboard },
        { name: "Create Blog", path: "/user/dashboard/createblog", icon: FilePlus },
        { name: "List Blog", path: "/user/dashboard/listblog", icon: List },

    ];

    return (
        <div className='bg-[#1a1a1a] border-y border-[#262626]'>
            <div className="border-b md:border-0 border-[#262626] flex justify-between items-center py-4 px-6 ">
                {/* Logo Section */}
                <Link href={"/"} className="flex items-center space-x-3">
                    <Image src="/logo.png" alt="FutureTech Logo" width={50} height={50} className='w-[35px] h-[35px] md:w-[50px]  md:h-[50px]' />
                    <span className="text-lg md:text-xl font-bold">FutureTech</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className='hidden xl:block'>
                    {selectedRole === "admin" ? (
                        admin ?
                            <Link href={"/admin/dashboard/users"} className="text-[18px] text-[#7E7E81] font-medium">
                                All Users
                            </Link>
                            :
                            <></>
                    )
                        :
                        selectedRole === "user" &&
                        (
                            user ?
                                <div className='flex gap-x-[40px]'>
                                    {userRoutes.map((routes, index) => {
                                        return (<Link key={index} href={routes.path} className="text-[18px] text-[#7E7E81] hover:text-[#555558] font-medium">
                                            {routes.name}
                                        </Link>)
                                    })}

                                </div>
                                :
                                <></>
                        )
                    }
                </div>

                {/* for desktop */}
                <div className='hidden xl:flex md:gap-x-4 md:items-center'>
                    {selectedRole === "admin" ? (
                        // if admin is logged-in then show their name and a logout button otherwise, show a login button
                        admin ?
                            <div className='flex items-center gap-x-2'>
                                <h5 className='flex items-center gap-x-2 text-[#7E7E81] text-[18px] font-semibold'>
                                    {/* signed-in admin name */}
                                    <User />Hi, Admin {admin.name}
                                </h5>
                                <Button onClick={() => { logoutAdmin(router) }} variant="logout" className="rounded-[8px] text-[16px] font-medium leading-[19.2px]">
                                    Logout
                                </Button>
                            </div>
                            :
                            <Button onClick={() => { loginAdmin(router) }} variant="lymdata" className="rounded-[8px] text-[16px] font-medium leading-[19.2px]">
                                Login
                            </Button>
                    )
                        :
                        selectedRole === "user" &&
                        (
                            // if user is logged-in then show their name and a logout button otherwise, show a login button
                            user ?
                                <div className='flex items-center gap-x-2'>
                                    <h5 className='flex items-center gap-x-2 text-[#7E7E81] text-[18px] font-semibold'>
                                        {/* signed-in user name */}
                                        <User />Hi, {user.name}
                                    </h5>
                                    <Button onClick={() => { logoutUser(router) }} variant="logout" className="rounded-[8px] text-[16px] font-medium leading-[19.2px]">
                                        Logout
                                    </Button>
                                </div>
                                :
                                <Button onClick={() => { loginUser(router) }} variant="lymdata" className="rounded-[8px] text-[16px] font-medium leading-[19.2px]">
                                    Login
                                </Button>
                        )
                    }

                    {/* Role Selection Dropdown admin/user */}
                    <Select value={selectedRole} onValueChange={handleChange}>
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block xl:hidden cursor-pointer text-[#FFFFFF] hover:text-gray-400 "
                >
                    {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </div>
            </div>

            {/* Mobile Navigation menu */}
            {isMenuOpen &&
                <div className='xl:hidden text-[16px] font-medium px-6 py-4 '>
                    <div className='flex justify-end'>
                        <Select value={selectedRole} onValueChange={handleChange}>
                            <SelectTrigger className="border-[#262626] border-2 bg-[#141414] w-40">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    {selectedRole === "admin" ? (
                        // if admin is logged-in then show their name,Navigation links and a logout button otherwise, show a login button
                        admin ?
                            <div className='space-y-4 mt-5'>

                                <h5 className='flex w-max border-b-4 border-[#262626] items-center gap-x-2 text-gray-200 text-[18px] font-semibold py-1'>
                                    <User /> Hi, Admin {admin.name}
                                </h5>

                                <Link className="flex w-max items-center gap-x-2 text-[18px] text-[#7E7E81] hover:text-[#555558] font-medium" href={"/admin/dashboard/users"}>
                                    <SquareUser />All users
                                </Link>

                                <div onClick={() => { logoutAdmin(router) }} className="flex w-max items-center gap-x-2 text-[18px] text-[#7E7E81] hover:text-[#555558] font-medium cursor-pointer">
                                    <LogOut />Log out
                                </div>
                            </div>
                            :
                            <div onClick={() => { loginAdmin(router) }} className="flex items-center mt-5 gap-x-2 text-[18px] text-[#7E7E81] hover:text-[#555558] font-medium cursor-pointer">
                                <LogIn />Log in
                            </div>
                    )
                        :
                        selectedRole === "user" &&
                        (
                            // if user is logged-in then show their name,Navigation links and a logout button otherwise, show a login button
                            user ?
                                <div className='space-y-4 mt-5'>
                                    <h5 className='flex w-max border-b-4 border-[#262626] items-center gap-x-2 text-gray-200 text-[18px] font-semibold py-1'>
                                        <User /> Hi, {user.name}
                                    </h5>
                                    {userRoutes.map((routes, index) => {
                                        return (<Link key={index} href={routes.path} className="flex w-max items-center gap-x-2 text-[18px] text-[#7E7E81] hover:text-[#555558] font-medium">
                                            <routes.icon /> {routes.name}
                                        </Link>)
                                    })}
                                    <div onClick={() => { logoutUser(router) }} className="flex w-max items-center gap-x-2 text-[18px] text-[#7E7E81] hover:text-[#555558] font-medium cursor-pointer">
                                        <LogOut />Log out
                                    </div>
                                </div>
                                :
                                <div onClick={() => { loginUser(router) }} className="flex items-center mt-5 gap-x-2 text-[18px] text-[#7E7E81] hover:text-[#555558] font-medium cursor-pointer">
                                    <LogIn />Log in
                                </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default NavbarButtons