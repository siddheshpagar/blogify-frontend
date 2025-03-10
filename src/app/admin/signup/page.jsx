"use client"

import Image from 'next/image'
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminSignUp } from '@/services/authAdmin';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

const Page = () => {
  // state for toggling show/hide password
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // schema for form validation using Zod
  const schema = z.object({
    name: z.string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must not exceed 50 characters")
      .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces"),

    email: z.string()
      .email("Invalid email format"),

    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(/^[A-Z]/, "Password must start with an uppercase letter"),
  });

  // react-hook-form for form handling and validation
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  // Mutation to handle Signup API request
  const SignupMutation = useMutation({
    mutationFn: adminSignUp,
    onSuccess: (data) => {
      alert(data.data.message);
      form.reset();
      router.push('/admin/login');
    },

    onError: (error) => {
      alert(error.response?.data?.message || "An unexpected error occurred");
    },
  })

  // function to handle form submission
  const handleSubmit = async (values) => {
    SignupMutation.mutate(values);
    // try {
    //   const response = await adminSignUp(values);
    //   if (response.status === 201) {
    //     alert(response.data.message); // Success message
    //     form.reset(); 
    //     router.push('/admin/login');
    //   } else {
    //     alert(response.data.message || "Registration failed");
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
                Sign Up
              </h1>
              <p className='text-[#98989A] font-normal text-[10px] md:text-[12.64px] leading-[15.17px] '>
                How do i get started lorem ipsum dolor at?
              </p>
            </div>

            {/* Admin name Input Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-[14.22px] leading-[17.06px] mb-[10px] md:mb-[12px]">Name</FormLabel>
                  <FormControl>
                    <Input className="rounded-[8px] md:w-[330px] h-[46px] bg-[#1A1A1A] border-[#262626] shadow-[0px_0px_0px_4px_#191919] text-[14.22px] font-normal leading-[17.06px] placeholder:text-[#89868D]" placeholder="Enter your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Admin email Input Field */}
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

            {/* Button to subimt Admin details for signup */}
            <div className='flex flex-col justify-center items-center gap-[40px] md:gap-[65px]'>

              <Button
                variant="lymdata"
                size="lymdata"
                type="submit"
                className="rounded-[8px] w-full md:w-full py-[10px] md:py-[12px] text-[16px] font-medium leading-[19.2px]"
                disabled={SignupMutation.isPending}
              >
                {SignupMutation.isPending ? "Signing up..." : "Sign up"}
              </Button>

              <h3 className='text-[#89868D] text-[14.22px] font-normal leading-[17.06px]'>
                or
              </h3>
              <h3 className='text-[#89868D] text-[14.22px] font-normal leading-[17.06px]'>
                Already have an acccount?
                <Link href={"/admin/login"} className='text-[#FFD11A]'>
                  Sign in
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
        className='flex-1 rounded-[15px] my-5 pr-[30px] md:h-screen w-auto'
      />

    </div>
  )
}

export default Page;
