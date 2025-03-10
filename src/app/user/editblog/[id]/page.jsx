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
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Tiptap from "@/components/Tiptap";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editBlogById, fetchBlogById } from "@/services/userService";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/services/APIConstant";
import Image from "next/image";

const Page = ({ params }) => {
  const { id } = params;
  const [imagePreview, setImagePreview] = useState(null);
  const [loadData, setLoadData] = useState(false);

  const { toast } = useToast()
  const router = useRouter();
  const queryClient = useQueryClient();

  // it fetches blog data by ID
  const fetchBlogByIdQuery = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  });

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
    image: z.union([
      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File size must be under 5MB.",
        })
        .refine(
          (file) => ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml", "image/webp",].includes(file.type),
          { message: "Only PNG, JPG, JPEG, GIF, and SVG files are allowed." }
        ),
      z.string().optional(), // Allow keeping the existing image URL
    ]),
  });

  // useForm hook for form handling and validation
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

  // Load existing blog data into the form when fetched
  useEffect(() => {
    if (fetchBlogByIdQuery.data?.data?.blog) {
      const blog = fetchBlogByIdQuery.data.data.blog;
      form.reset({
        title: blog.title,
        category: blog.category,
        author: blog.author,
        date: new Date(blog.createdAt),
        description: blog.description,
        image: blog.image, // Keep original image
      });
      if (blog.image) {
        setImagePreview(`${BASE_URL}/blog-pics/${blog.image}`);
      }
      setLoadData(true);
    }
  }, [fetchBlogByIdQuery.data, form])

  // update blog mutation
  const updateBlogMutation = useMutation({
    mutationFn: (updatedData) => editBlogById(id, updatedData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userBlogs"]);
      queryClient.invalidateQueries(["blog"]);
      queryClient.setQueryData(["blog", id], data.data.blog);//in fiture
      alert(data.data.message);
      router.push("/user/dashboard/listblog");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to update blog.");
    },
  });

  // function to handle form submission
  const handleSubmit = (values) => {
    updateBlogMutation.mutate(values);
    // form.reset();
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
    setImagePreview(null);
    form.setValue("image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input value
    }
  };

  // shows loading till it get data from backend
  if (fetchBlogByIdQuery.isLoading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
        <Image className="animate-spin rounded-full" src="/loading.png" width={48} height={48} alt="Loading..." />
        <p className="mt-4 text-2xl font-semibold text-white animate-pulse">
          Loading....
        </p>
      </div>
    )
  }

  // shows and handles error recieved from backend
  if (fetchBlogByIdQuery.isError) {
    const errorMessage = fetchBlogByIdQuery.error.response?.data?.message || "something went wrong please try again";

    if (errorMessage.toLowerCase().includes("please login first")) {
      router.push("/user/login");
      return null;
    }

    return (
      <div className="text-white text-center py-4">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="m-4 md:m-10  ">
      <h2 className="text-[#FFD11A] text-[20px] md:text-[25.63px] font-bold  mt-[15.5px] mb-[40px] md:mb-[76.5px] ">Edit Blog</h2>

      {loadData ?
        <div className="bg-[#1A1A1A] rounded-[8px]  text-[#FFFFFF]  pt-[20px] lg:pt-[38px] pb-[30px] lg:pb-[54px] px-[16px] lg:px-[43px]  w-full ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-6"
            >

              {/* Blog Image */}
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
                            className="flex flex-col items-center justify-center p-[30px] lg:p-[40px]  max-w-[200px] lg:max-w-[300px] border border-dashed border-[#FFD11A] rounded-[8px] text-center gap-[10px]"
                          >
                            <CloudUpload className="fill-[#FFD11A] size-8" />
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

              <div className="grid gap-y-[40px] gap-x-[30px] grid-cols-1 md:grid-cols-2">
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
                  Edit Blog
                </Button>
              </div>
            </form>
          </Form>
        </div>
        : ""}

    </div>
  );
};

export default Page;
