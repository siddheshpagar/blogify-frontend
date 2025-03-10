"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { deleteUserBlogById, fetchUserBlogs } from "@/services/userService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilLine, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast()

  // fetch the list of blogs created by the logged-in user
  const userBlogsQuery = useQuery({
    queryKey: ["userBlogs"],
    queryFn: fetchUserBlogs,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  // function to delete a blog using mutation
  const deleteUserBlogByIdMutation = useMutation({
    mutationFn: deleteUserBlogById,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userBlogs"], { exact: true });
      toast({
        title: "Blog Deleted",
        description: "The blog has been successfully deleted.",
        variant: "destructive",
      });
    },
  });

  // shows loading state till we get response from backend
  if (userBlogsQuery.isLoading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center m-52 ">
        <Image className="animate-spin rounded-full" src="/loading.png" width={48} height={48} alt="Loading..." />
        <p className="mt-4 text-2xl font-semibold text-white animate-pulse">
          Loading....
        </p>
      </div>
    )
  }

  // Handle error recieved from backend 
  if (userBlogsQuery.isError) {
    const errorMessage = userBlogsQuery.error.response?.data?.message || "something went wrong please try again";

    if (errorMessage.toLowerCase().includes("please login first")) {
      router.push("/user/login");
      return null;
    }

    return (
      <div className="text-white text-center my-10 mx-4 md:my-20 md:mx-10">
        {errorMessage.toLowerCase().includes("you have created 0 blogs")
          ?
          <div>
            <Image src="/nodata.gif" width={100} height={100} alt="No Data" className="mx-auto w-60 h-60 md:w-96 100 md:h-96 mb-2" />
            "It looks like you haven't created any blogs yet.
            <br />
            Start sharing your thoughts and ideas by creating your first blog!"
          </div>

          : errorMessage}
      </div>
    );
  }

  // function to format date into a readable format
  const formatDate = (createdAtDate) => {
    const date = new Date(createdAtDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short", // Abbreviated month name
      year: "numeric",
      weekday: "short",
    }).format(date);
  };

  return (
    <div className="w-screen md:w-auto px-[16px] lg:px-[29px]  my-[10px] lg:my-[40px] ">
      <Table className="bg-[#1A1A1A] rounded-lg shadow-md" >
        <TableHeader className="bg-[#1E1E1E] ">
          <TableRow className="">
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date Published</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-[#1A1A1A]">
          {userBlogsQuery.data?.data?.blogs.map((item, index) => (
            <TableRow className="" key={index}>
              <TableCell>{item.author}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              {/* { date = new Date(item.createdAt)} */}
              {/* {console.log(new Date(item.createdAt))} */}
              <TableCell>
                <div className="flex items-center gap-2">
                  {/* edit blog button */}
                  <PencilLine
                    className="text-gray-400 cursor-pointer hover:text-white "
                    onClick={() =>
                      // redirect user edit page
                      router.push(`/user/editblog/${item._id}`)
                    }
                  />
                  {/* delete blog button */}
                  <Trash
                    onClick={() => {
                      deleteUserBlogByIdMutation.mutate(item._id);
                    }}
                    className="text-gray-400 cursor-pointer hover:text-white "
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page