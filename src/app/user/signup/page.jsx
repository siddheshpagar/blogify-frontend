"use client"

import Image from 'next/image'
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { userSignUp } from '@/services/authUser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

    designation: z.string()
      .min(2, "Designation must be at least 2 characters long")
      .max(50, "Designation must not exceed 50 characters")
      .regex(/^[A-Za-z\s]+$/, "Designation must only contain letters and spaces"),

    email: z.string()
      .email("Invalid email format"),

    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(/^[A-Z]/, "Password must start with an uppercase letter"),

    terms: z.boolean().refine(val => val === true, {
      message: "You must agree to the Terms of Use and Privacy Policy",
    }),
  });

  // react-hook-form for form handling and validation
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      designation: '',
      email: '',
      password: '',
      terms: false,
    }
  });

  // Mutation to handle Signup API request
  const SignupMutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      alert(data.data.message);
      form.reset();
      router.push('/user/login');
    },

    onError: (error) => {
      alert(error.response?.data?.message || "An unexpected error occurred");
    },
  })

  // function to handle form submission
  const handleSubmit = async (values) => {
    const { terms, ...registrationData } = values;// Excluding terms field
    SignupMutation.mutate(registrationData);
  };

  return (
    <div className='px-[16px] lg:px-0 flex flex-col lg:flex-row lg:items-start lg:justify-center lg:space-x-[80px] lg:py-[80px] py-[64px] space-y-[64px] lg:space-y-0'>

      <div>
        <Image src="/logInImg.png" alt="FutureTech Logo" width={80} height={80} className='w-[80px] h-[80px] mb-[50px]' />
        <h1 className=' text-[24px] lg:text-[58px]'>Welcome,<br />
          Enter your details to <br />
          Create Account</h1>
      </div>

      <div className='mt-4 lg:pl-[80px] lg:border-[#262626] lg:border-l'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-[16px] lg:gap-[50px]'
          >
            {/* User name Input Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] lg:text-[18px] mb-[16px]">Name</FormLabel>
                  <FormControl>
                    <Input className="text-[12px] lg:text-[18px] lg:w-[500px] h-[58px] lg:h-[67px] bg-[#1A1A1A] border-[#262626] shadow-[0px_0px_0px_4px_#191919]" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* User designation Input Field */}
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] lg:text-[18px] mb-[16px]">Designation</FormLabel>
                  <FormControl>
                    <Input className="text-[12px] lg:text-[18px] lg:w-[500px] h-[58px] lg:h-[67px] bg-[#1A1A1A] border-[#262626] shadow-[0px_0px_0px_4px_#191919]" placeholder="Designation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* User email Input Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] lg:text-[18px] mb-[16px]">Email Address</FormLabel>
                  <FormControl>
                    <Input className="text-[12px] lg:text-[18px] lg:w-[500px] h-[58px] lg:h-[67px] bg-[#1A1A1A] border-[#262626] shadow-[0px_0px_0px_4px_#191919]" placeholder="Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* User password Input Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] lg:text-[18px] mb-[16px]">Password</FormLabel>
                  <FormControl>

                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pr-10 text-[12px] lg:text-[18px] lg:w-[500px] h-[58px] lg:h-[67px] bg-[#1A1A1A] border-[#262626] shadow-[0px_0px_0px_4px_#191919]"
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

            {/* Terms and conditions checkbox */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-row items-center'>
                    <FormControl>
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        className="bg-[#1A1A1A] border-[#262626] shadow-[0px_0px_0px_4px_#191919] mr-[10px]"
                      />
                    </FormControl>
                    <FormLabel className="text-[12px] lg:text-[18px]">I agree with Terms of Use and Privacy Policy</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Button to subimt user details for signup */}
            <div className='flex flex-col justify-center items-center'>
              <Button
                variant="lymdata"
                size="lymdata"
                type="submit"
                className="rounded-[8px] mb-[40px] w-full md:w-auto py-[10px] md:py-[18px] md:px-[46px] text-[14px] md:text-[18px] font-medium leading-[24px] md:leading-[27px] "
                disabled={SignupMutation.isPending}
              >
                {SignupMutation.isPending ? "Signing up..." : "Sign up"}
              </Button>

              <h3 className='text-[#666666] text-[12px] lg:text-[20px] mb-[33px] lg:mb-[31px]'>
                or
              </h3>
              <h3 className='text-[#666666] text-[12px] lg:text-[16px]'>
                Already have an acccount?
                <Link href={"/user/login"} className='text-[#FFD119]'>
                  Sign in
                </Link>
              </h3>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Page;  
