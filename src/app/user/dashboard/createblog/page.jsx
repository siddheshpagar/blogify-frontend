"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CloudUpload, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover } from "@radix-ui/react-popover";
import {
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Tiptap from "@/components/Tiptap";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadBlog } from "@/services/userService";
import { useRouter } from "next/navigation";

const Page = () => {
  // state to store the selected image preview URL
  const [imagePreview, setImagePreview] = useState(null);
  const { toast } = useToast()
  // react query-client instance to manage and invalidate cached data
  const queryClient = useQueryClient();
  const router = useRouter();

  // schema for form validation using Zod
  const schema = z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(60, "Title must not be more than 60 characters"),
    category: z.enum(["Technology", "Lifestyle", "Education"], { message: "Please select a category from the menu" }),
    author: z
      .string()
      .min(3, "Author name must be at least 3 characters long")
      .max(30, "Author name must not be more than 30 characters"),
    description: z
      .string()
      .min(30, "Description must be at least 30 characters long")
      .max(4000, "Description must not be more than 4000 characters"),
    date: z
      .date().nullable().refine((val) => !!val, {
        message: "The date of publication is required.",
      }),
    image: z.custom((file) => {
      if (!(file instanceof File)) return false;
      const validTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/svg+xml",
        "image/webp",
      ];
      return validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024; // Max size: 5MB
    }, {
      message:
        "Image must be a valid file type (PNG, JPG, JPEG, GIF, SVG) under 5MB.",
    }),
  });

  // react-hook-form for form handling and validation
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      author: "",
      date: null,
      description: "",
      image: null,
    },
  });

  // upload blog mutation
  const submitBlog = useMutation({
    mutationFn: uploadBlog,
    onSuccess: (data) => {
      // queryClient.setQueryData(["userBlogs"], (oldData) => {
      //   // If there's no old data,add these data
      //   if (!oldData) {
      //     return [data.data.blog];
      //   }
      //   // Add new data to the existing data
      //   return [...oldData, data.data.blog];
      // });
      queryClient.invalidateQueries(["userBlogs"]);
      queryClient.invalidateQueries(["blog"]);//invalidate to fectch data again
      alert(data.data.message);
      router.push("/user/dashboard/listblog");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to create blog.");
    },
  });

  // function to handle form submission
  const handleSubmit = (values) => {
    // submitBlog.mutate(values);// Uncomment this line when running on localhost (your local machine) to enable blog uploads
    alert("Blog uploading is currently disabled by the developer of this website.");
  };

  // function to handle image preview
  const handleImageChange = (file) => {
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    } else {
      setImagePreview(null); // Reset if no file selected
    }
  };

  // reference to the file input for clearing its value
  const fileInputRef = useRef(null);

  // function to clear the selected image
  const handleImageClear = () => {
    if (fileInputRef.current) {
      setImagePreview(null);
      form.setValue("image", null);
      fileInputRef.current.value = ""; // Clear the input value
    }
  };
  return (
    <div className="text-[#FFFFFF] bg-[#1A1A1A] pt-[20px] lg:pt-[38px] pb-[30px] lg:pb-[54px] pr-[10px] lg:pr-[17px] pl-[16px] lg:pl-[43px] mt-10 xl:w-[763px] 2xl:w-[1163px]  mb-[67px] lg:mb-[87px] ml-[16px] mr-[16px] lg:ml-[12px] 2xl:ml-[20px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >

          {/* Blog Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14.22px] font-[400]">
                  Blog Image
                </FormLabel>
                <FormControl>
                  <div>
                    {/* if an image is selected display the preview of img if the user clicks the "X" button remove the preview and allow them to select a new image */}
                    {imagePreview ? (
                      <div className="relative max-w-[200px] lg:max-w-[236px]">
                        <img
                          src={imagePreview}
                          alt="Selected"
                          className="w-full h-auto rounded-[8px] object-cover"
                        />
                        <Button className="absolute top-0 right-0 w-8 h-8 bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 hover:scale-110" onClick={handleImageClear}>
                          <X />
                        </Button>
                      </div>
                    ) :
                      <Label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center p-[30px] max-w-[200px] lg:max-w-[236px] border border-dashed border-[#FFD11A] rounded-[8px] text-center gap-[10px]"
                      >
                        <CloudUpload className="fill-[#FFD11A]" />
                        <p className="text-[#98989A]">
                          <span className="text-[#FFD11A]">
                            Click to upload
                          </span>
                          {" "} or drag and drop SVG, PNG, JPG or GIF(max, 800x400px)
                        </p>
                      </Label>
                    }
                    <FormMessage className="mt-1 mb-[30px] lg:mb-[48px]" />
                    <Input
                      id="image"
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        field.onChange(file);
                        handleImageChange(file); // Update preview
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid gap-y-[40px] gap-x-[30px] grid-cols-1 lg:grid-cols-2">
            {/* Blog Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14.22px] font-[400]">
                    Blog Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[46px] bg-[#1E1E1E] border border-[#262626] rounded-[8px] text-white placeholder:text-[#89868D] focus:border-white"
                      placeholder="The Best Kept Secrets"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Publishing Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-[14.22px] font-[400] mb-[2px]">Publishing Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={"h-[46px] bg-[#1E1E1E] border border-[#262626] rounded-[8px] text-white focus:border-white  text-left font-normal"}
                        >
                          {field.value ?
                            format(field.value, "PPP")
                            :
                            <span className="text-[#89868D]">
                              Pick a date
                            </span>}
                          <CalendarIcon className="ml-auto h-4 w-4 text-[#98989A]" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blog Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className="h-[46px] bg-[#1E1E1E] border border-[#262626] rounded-[8px] text-white focus:border-white"
                      >
                        <SelectValue placeholder="select blog category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-[#262626] rounded-[8px] bg-[#1E1E1E] text-white">
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blog Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14.22px] font-[400]">Author</FormLabel>
                  <FormControl>
                    <Input
                      className="h-[46px] bg-[#1E1E1E] border border-[#262626] rounded-[8px] text-white placeholder:text-[#89868D] focus:border-white"
                      placeholder="Enter author name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Blog Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14.22px] font-[400]">
                  Description
                </FormLabel>
                <FormControl>
                  <Tiptap
                    content={field.value} // Initialize with form field value
                    onChange={(newContent) => field.onChange(newContent)} // Update form value
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Blog Submit Button */}
          <div className="flex justify-end mt-[102px]">
            <Button
              type="submit"
              className="rounded-[4px] w-[211px] h-[66px] bg-[#FFD119] text-[#1A1A1A] text-[12.64px] hover:bg-[#887321]"
            >
              Create Blog
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;