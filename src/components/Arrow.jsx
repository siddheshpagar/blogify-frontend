
function Arrow({ color = '#FFD11A' }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block" // Use inline-block for proper alignment
            fill="none"
            viewBox="0 0 24 24"
            stroke={color} // Apply the color prop here
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17l10-10m0 0h-7m7 0v7"
            />
        </svg>
    );
}

export default Arrow;

//arrow 
// function Arrow() {
//     return (
//         <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 text-[#FFD11A] inline-block ml-1" // Use inline-block for proper alignment
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             aria-hidden="true"
//         >
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M7 17l10-10m0 0h-7m7 0v7"
//             />
//         </svg>
//     )
// }

// export default Arrow;