"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBox() {
  // list of searchable words with corresponding URLs
  const words = [
    { name: "Create a Blog", url: "/user/dashboard/createblog" },
    { name: "List Blogs", url: "/user/dashboard/listblog" },
    { name: "Home", url: "/" },
  ];

  // State to manage search input
  const [searchTerm, setSearchTerm] = useState(""); // Initialize as a string
  // State to store filtered search results
  const [filteredWords, setFilteredWords] = useState([]);
  // State to trace index in the search list for keyboard navigation
  const [activeIndex, setActiveIndex] = useState(-1);
  // const [hydrationCompleted, setHydrationCompleted] = useState(false); // Added to ensure hydration is complete

  const router = useRouter(); // For navigation
  // Get current pathname
  const pathname = usePathname();

  // Determining current page title/name from pathname
  const currentPage = words.find((word) => word.url === pathname)?.name || "Welcome";


  // Prevent SSR and ensure client-only behavior
  // useEffect(() => {
  //   setHydrationCompleted(true); // Mark hydration as complete
  // }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Reset active index
    setActiveIndex(-1);

    // Filter words based on input
    if (value.trim() !== "") {
      setFilteredWords(
        words.filter((word) =>
          word.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredWords([]);
    }
  };

  // Handles keyboard action for selection and navigation   
  const handleKeyDown = (e) => {
    if (filteredWords.length > 0) {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) =>
          prev < filteredWords.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        router.push(filteredWords[activeIndex].url);
        setFilteredWords([]);
      }
    }
  };

  // Handle click on search suggestion item to navigating to that page
  const handleItemClick = (word) => {
    setSearchTerm(word.name);
    setFilteredWords([]);
    router.push(word.url);
  };

  // Return null until hydration is complete to prevent mismatches
  // if (!hydrationCompleted) return null;

  return (
    <div className="flex items-center gap-[50px] lg:gap-[100px] relative text-black w-auto   ">
      <h1 className="text-[#FFD11A] text-[20px] lg:text-[25.63px] font-bold">{currentPage}</h1>

      <div className="relative">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search anything here..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          className="text-[10px] lg:text-[14.22px] bg-[#262626] text-white w-auto lg:w-[330px] h-auto lg:h-[46px] py-[14px] px-[15px] border border-[#262626] rounded-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder:text-[#89868D] font-normal"
        />

        <span className="absolute inset-y-0 right-3 flex items-center">
          <Search className="text-[#89868D]  h-[10px] lg:h-[14px] w-[13px]" />
        </span>

        {/* Search results dropdown */}
        {filteredWords.length > 0 && (
          <ul className="absolute left-0 w-full bg-[#2b2b2b] border border-[#444444] rounded-lg shadow-lg mt-1 z-10">
            {filteredWords.map((word, index) => (
              <li
                key={index}
                className={`p-3 hover:bg-gray-500 text-white cursor-pointer rounded-none  first:rounded-lg first:rounded-b-none last:rounded-t-none last:rounded-lg   ${index === activeIndex ? "bg-gray-500" : ""
                  }`}
                onClick={() => handleItemClick(word)}
              >
                {word.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
