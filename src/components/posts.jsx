// Dummy Posts array with userId added
const Posts = [
    { id: 1, title: "Post 1", userId: 1 },
    { id: 2, title: "Post 2", userId: 2 },
    { id: 3, title: "Post 3", userId: 1 },
    { id: 4, title: "Post 4", userId: 3 },
    { id: 5, title: "Post 5", userId: 2 },
    { id: 6, title: "Post 6", userId: 3 },
    { id: 7, title: "Post 7", userId: 1 },
    { id: 8, title: "Post 8", userId: 2 },
    { id: 9, title: "Post 9", userId: 3 },
    { id: 10, title: "Post 10", userId: 1 },
  ];
  
  // Dummy Users array
  const Users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];
  
  // Function to get all posts
  export async function getPosts() {
    return Posts;
  }
  
  // Function to get a specific post by id
  export async function getPost(id) {
    return Posts.find((post) => post.id === id); // Returns an array with the post that matches the id
  }
  
  // Function to get a user by userId
  export async function getUser(userId) {
    return Users.find((user) => user.id === Number(userId)); // Returns the user object with the specified userId
  }
  
  // export async function createPost({title, userId}) {
  //   Posts.push({ id: Posts.length + 1 , title, userId });
  //   return { id: Posts.length + 1 , title, userId };
  // }
  export async function createPost({ title, userId }) {
    const newId = Posts.length + 1; // Calculate new ID
    const newPost = { id: newId, title, userId };
    Posts.push(newPost);
    return newPost;
  }
  
  // Function to get paginated posts with pagination info
  export async function getPostsPaginated(page = 1, limit = 5) {
    const startIndex = (page - 1) * limit;//5==> 10
    const endIndex = page * limit;//10
    const paginatedPosts = Posts.slice(startIndex, endIndex);//5
  
    const totalPosts = Posts.length;//10
    const hasNextPage = endIndex < totalPosts;//10 === 10
    const hasPreviousPage = startIndex > 0;// 5 > 0true
  
    return {
      posts: paginatedPosts,//
      nextPage: hasNextPage ? page + 1 : null,//null
      previousPage: hasPreviousPage ? page - 1 : null,//2-1= 1
    };
  }
  
  