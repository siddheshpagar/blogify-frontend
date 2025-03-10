import Arrow from "../Arrow";

export const footersections = [
    {
        title: "Home",
        items: [
            {
                name: "Features"
            },
            {
                name: "Blogs"
            },
            {
                name: "Resources",
                isNew: true, // Mark items that have the "New" label
            },
            {
                name: "Testimonials"
            },
            {
                name: "Contact Us"
            },
            {
                name: "Newsletter"

            },
        ],
    },
    {
        title: "News",
        items: [
            {
                name: "Trending Stories"
            },
            {
                name: "Featured Videos"
            },
            {
                name: "Technology"
            },
            {
                name: "Health"
            },
            {
                name: "Politics Us"
            },
            {
                name: "Environment"
            },
        ],
    },
    {
        title: "Blogs",
        items: [
            {
                name: "Education",
                url:"blog/"
            },
            {
                name: "Lifestyle",
                url:"blog/"
            },
            {
                name: "Technology",
                url:"blog/"
            },
            {
                name: "Biotechnology",
                url:"blog/",
                isNew: true, // Mark items that have the "New" label
            },
            {
                name: "Quantum Computing",
                url:"blog/"

            },
            {
                name: "AI Ethics",
                url:"blog/"

            },
        ],
    },
    {
        title: "Podcasts",
        items: [
            {
                name: "AI Revolution"
            },
            {
                name: "AI Revolution",
                isNew: true, // Mark items that have the "New" label
            },
            {
                name: "TechTalk AI"
            },
            {
                name: "AI Conversations"
            },
        ],
    },
];

export const resources = [
    {
        title: "Whitepapers",
        icon: <Arrow />
    },
    {
        title: "Ebooks",
        icon: <Arrow />

    },
    {
        title: "Reports",
        icon: <Arrow />
    },
    {
        title: "Research Papers",
        icon: <Arrow />

    }
];