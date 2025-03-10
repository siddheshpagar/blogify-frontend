"use client"

import Image from 'next/image'
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { adminLogin } from '@/services/authAdmin';
import { useAdminStore } from '@/store/adminStore';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const Page = () => {
  // state for toggling show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // after log-in fetch user details from global store fuction
  const fetchAdmin = useAdminStore((state) => state.fetchAdmin);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard/users';

  // schema for form validation using Zod
  const schema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must not be more than 20 characters")
      .regex(/^[A-Z]/, "Password must start with an uppercase letter"),
  });

  // react-hook-form for form handling and validation
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      // terms: false, // Initial value for checkbox
    }
  });

  // Mutation to handle login API request
  const loginMutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: async (data) => {
      alert(data.data.message);
      form.reset();
      await fetchAdmin();
      router.push(redirectUrl);
    },
    // 
    onError: (error) => {
      alert(error.response?.data?.message || "An unexpected error occurred");
    },
  })

  // function to handle form submission
  const handleSubmit = async (values) => {
    loginMutation.mutate(values);
    // const { terms, ...adminLoginData } = values;

    // try {
    //   const response = await adminLogin(values);
    //   if (response.status === 200) {

    //     alert(response.data.message);

    //     form.reset();
    //     await fetchAdmin();
    //     router.push(redirectUrl);
    //   }
    // } catch (error) {
    //   alert(error.response?.data?.message || "An unexpected error occurred");
    // }
  };


  return (
    <div
      style={{ boxShadow: '0px 0px 4px 0px #00000026', fontFamily: 'Lato' }}
      className='bg-[#1A1A1A] rounded-md md:rounded-[30px] mx-[16px] my-[30px] md:mx-[80px] md:my-[138px] flex flex-col md:flex-row flex-wrap gap-y-2 md:gap-y-0 '
    >

      <div className='my-[50px] md:my-[145.5px] flex-1 flex items-center justify-center'>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-[20px]'
          >
            <div >
              <h1 className='leading-[34.6px] text-[25px] md:text-[28.83px] font-bold mb-[5px]'>
                Login
              </h1>
              <p className='text-[#98989A] font-normal text-[10px] md:text-[12.64px] leading-[15.17px] '>
                How do i get started lorem ipsum dolor at?
              </p>
            </div>

            {/* Admin Email Input Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-[14.22px] leading-[17.06px] mb-[10px] md:mb-[12px]">Email</FormLabel>
                  <FormControl>
                    <Input className="rounded-[8px] md:w-[330px] h-[46px] bg-[#1A1A1A] border-[#262626] shadow-[0px_0px_0px_4px_#191919] text-[14.22px] font-normal leading-[17.06px] placeholder:text-[#89868D]" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Admin password Input Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-[14.22px] leading-[17.06px] mb-[10px] md:mb-[12px]">Password</FormLabel>
                  <FormControl>

                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pr-10 rounded-[8px] md:w-[330px] h-[46px] bg-[#1A1A1A] border-[#262626] shadow-[0px_0px_0px_4px_#191919] text-[14.22px] font-normal leading-[17.06px] placeholder:text-[#89868D]"
                        placeholder="Password"
                        {...field}
                      />
                      {/* Toggle show/hide password */}
                      <div
                        className="cursor-pointer bg-transparent absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col justify-center items-center gap-[40px] md:gap-[65px]'>

              <Button
                variant="lymdata"
                size="lymdata"
                type="submit"
                className="rounded-[8px] w-full md:w-full py-[10px] md:py-[12px] text-[16px] font-medium leading-[19.2px]"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Signing in..." : "Sign in"}
              </Button>

              <h3 className='text-[#89868D] text-[14.22px] font-normal leading-[17.06px]'>
                or
              </h3>
              <h3 className='text-[#89868D] text-[14.22px] font-normal leading-[17.06px]'>
                Don’t have an acccount.
                <Link href={"/admin/signup"} className='text-[#FFD11A]'>
                  Sign up
                </Link>
              </h3>
            </div>
          </form>
        </Form>
      </div>

      <Image
        src="/adminLoginPage.png"
        alt="amazing work waiting for you"
        width={800}
        height={784}
        className='flex-1 rounded-[15px] my-5 pr-[30px] md:h-screen w-auto'//
      />


    </div>
  )
}

export default Page;
