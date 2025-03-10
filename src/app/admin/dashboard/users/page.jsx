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
    "https://s3-alpha-sig.figma.com/img/23ed/ad01/53988d6704197a43ed4d17e51f00e455?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZEfIULAaGP~auOisL2nQAnfO~555MiDujeMGhurpuqd29z3oTSS6i0doWw9jU~EXQyUSJ5Umb8ZycoKsJfe8t1vD5SnPWDJWZKp9a0WhvNsBriTgL0qBNosoVYRvJpu6vghH1cPb~0LTRdiQYbpyxEdl8SzFHqFBXg4f16ByzIbBoQ~fsZvIDEgZJHtEkbBJkM2YMSWVyMeyOA8xPDr9hek5ZjXSV7lcbn8GsL9di8LXZGqHRNE7deYCENVQ3cncBiUyDUUNo3LzOmXP2C3dD6Q~~2Zr3HOnR0APpBbAHzjA9NXA~IPWYz-jJTixf6MYuHUu~wO1fjXOP57BQzK2FQ__",
    "https://s3-alpha-sig.figma.com/img/f0a3/3761/69c4da5e78338d8bb6dc30ecc0564f18?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Cr6o4JdcO2Hwf~ei-8kgTojS4jJDAWaNWt7YU42aD2ucQsQRqEq7tW8QsVOkqyE4FNi-zul~1sLRY-qtqpq9a3tnrm9T6zovA4jK65e8XQRz7TE03RdzOxiMaqoLckyCA6ZfhGvP-xXXNe9p5pveQhLNlAuwv0ZjNY9YCXVbl5CJpwXeixotKPzlPlUQC5lobzp~NkUtszOzguEnm6W80xE5tOsrUBYBWDOykgEAfHbhNrqBw0Zedjb48Wx1rakxlUqY1JokomBmGKdR~22zlVNF0ZUWeVYpfyOuo9N0Ib1fWfl2gVJ~ipAVA0ti1S2VTKmueYtNZAOp1xINyBjvbw__",
    "https://s3-alpha-sig.figma.com/img/c9f0/5936/9f4f78c8093dd68bfe6026a03a9fa2c8?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LS2E2m5CqNXbvqVprBvFkQLhgfc7c-2RexQIkTt8xOgIgISTfjU~Drpt8hAPU-YEtBlNcSKWlG~6furSaK51VkDpzrIkY2m9f3j1DDbx7~M0fZ2gRW-Rd5UnE53voe52zvHyCtREi~Xw0yhwgY2cdfvc1N7fpVyJcpQy3TMlIsNadbmyOiO8a-b7tEEbEZajoE2DFVnU62eFKbK9pLMmm1HP0Es4M0AyVj0CHwjTr9D8uYv-9-hHZXTj5o0Ym-x~8iVXDX1IM~Mq1aeGyszWvJN3mv2TL8rw0QJPW~TEhfdZrcdUq9DEpqXFIeAsDdyubRlwkvLkVbX0R8POSgUrUA__",
    "https://s3-alpha-sig.figma.com/img/939f/d722/70ffd81364346efa0b542910aed37b59?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AYVRtVJBzvULAFrkfDcZ78GJoXT6m4oOkd1BtAxMlvpy40ZNdHyt9dvxhI~-viIbGjj6aElH1xTReKyWTjQCxkb-OvV~cxbAUELbRCdzs6bNjJ8OgpeR3tnhL~szSLAhf1ClhJXEazce1pfDtfCdvv40IBz~z22Sw6cUM-wGsg9jFWmtsCiLqcyj1pIJrXml2ttJ7qTBZtZVYXlE6ufi0e95e26kQ03uh2GMfUMWqVZsN5mUy72k2DTNfJgKQMrlqEJxWpIqQTET~1g~NCTnXhCSjjQniaeXYDw66sMb8rhrHW1G3Wu1exrByupKnQmEE9M2EIzHH9nwPLemDi4Z9A__",
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
                src={userImages[index % 3]}
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
