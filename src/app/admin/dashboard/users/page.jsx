"use client"

import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { fetchAllUsers, setBlockStatus } from '@/services/adminService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Users = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // state for sorting criteria
  const [selectSortCriteria, setSelectSortCriteria] = useState();

  // state for refetching indicator
  const [isRefetching, setIsRefetching] = useState(false);

  // dummy user images
  const userImages = [
  "/images/user1.jpg",
  "/images/user2.jpg",
  "/images/user3.jpg",
  "/images/user4.png",
  "/images/user5.jpg", 
  ];

  // react-query to Fetch user 
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    // staleTime:2*60*1000, //2 min
    staleTime: Infinity,
  });

  // mutation for blocking/unblocking a user
  const blockUnblockUserMutation = useMutation({
    mutationFn: setBlockStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"], { exact: true });
    },
  });

  // function to toggle block/unblock user
  const handleBlockUnblock = async (userId, isBlocked) => {
    blockUnblockUserMutation.mutate({ userId, isBlocked });
  }

  // function to set sorting criteria and due to which users get sorted
  const handleSort = (criteria) => {
    setSelectSortCriteria(criteria);
  };

  // Function to manually refetch users list
  const handleRefetch = async () => {
    setIsRefetching(true);
    await usersQuery.refetch();
    setIsRefetching(false);
  };

  // shows loading till it fetches the data at start
  if (usersQuery.isLoading) {
    return (
      <div className="p-10 flex flex-col gap-2 items-center justify-center w-screen md:w-auto">
        <Image className="animate-spin rounded-full" src="/loading.png" width={48} height={48} alt="Loading..." />
        <p className="mt-4 text-2xl font-semibold text-white animate-pulse">
          Loading....
        </p>
      </div>
    );
  }

  // Handle error recieved from backend 
  if (usersQuery.isError) {
    const errorMessage = usersQuery.error.response?.data?.message || "something went wrong please try again";
    alert(errorMessage)

    if (errorMessage.toLowerCase().includes("please login first")) {
      router.push("/admin/login");
    }

    return null;
  }

  // complete code
  return (
    <div className="mt-[50px] md:mx-[30px] flex flex-col items-center justify-center w-screen md:w-auto">
      <div className="mb-6 flex flex-col md:flex-row gap-2  md:justify-end md:w-full">
        {/* button to refresh */}
        <Button className="w-max text-black bg-blue-600 gap-1 flex justify-center items-center" onClick={handleRefetch}>
          <RefreshCw className={isRefetching ? "animate-spin  [animation-duration:500ms]" : ""} />Refresh
        </Button>
        {/* sorting criteria selecion */}
        <Select onValueChange={handleSort} value={selectSortCriteria}>
          <SelectTrigger className="w-[180px]">
            <span>Sort by</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="designation">designation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Show loading spinner when user clicks on refresh button */}
      {isRefetching && (
        <div className="flex justify-center items-center mb-5 md:mb-7">
          <Image className="animate-spin" src="/loading.png" width={32} height={32} alt="Refreshing..." />
        </div>
      )}

      {/* Displays user list */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-[24px] gap-y-[42px]">
        {usersQuery.data.data.users
          .sort((a, b) => {
            if (selectSortCriteria === "name") {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            } else if (selectSortCriteria === "designation") {
              return a.designation.toLowerCase().localeCompare(b.designation.toLowerCase());
            }
            return 0; // Default case (no sorting)
          })
          .map((user, index) => (
            <div
              className="w-[254px] h-[264px] flex flex-col items-center justify-center rounded-[12px] border border-[#262626] text-center bg-[#1A1A1A] "
              key={index}
            >
              <Image
                src={userImages[index % 5]}
                alt="user"
                height={80}
                width={80}
                className="mx-auto h-[80px] w-[80px] rounded-full object-cover object-center"
              />
              <h3 className="mt-[14px] text-[14px] font-bold">{user.name}</h3>
              <p className="mt-[4px] text-[#98989A] text-[12px] ">{user.designation}</p>
              <Button
                className="mt-[24px]"
                variant={user.isBlocked ? "unBlock" : "block"}
                onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
              >
                {user.isBlocked ? "Unblock" : "Block"}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
