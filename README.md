# Blogify - A Modern Blogging Platform

## 🚀 Project Overview
Blogify is a fully functional blogging platform built using the **MERN Stack** with **Next.js** as the frontend framework and **Node.js (Express.js)** as the backend. This application allows users to create, edit, delete, and view blogs while also providing an admin panel for user management.

## 📌 Features

### 🔹 Frontend (Next.js)
- **State Management:** Zustand for global state management.
- **API Handling:** React Query / TanStack Query for efficient API calls and caching.
- **Form Handling & Validation:** React Hook Form (RHF) & Zod for robust validation.
- **Authentication:** JWT-based authentication, storing tokens securely in HTTP-only cookies.
- **Middleware Protection:** Ensuring route security based on user authentication status.
- **UI & Styling:** Built with **Shadcn UI** & **Tailwind CSS** for a clean, modern, and responsive design.
- **Rich Text Editor:** Users can style text using Bold, Italic, Underline, Lists, Quotes, Code blocks, etc.
- **Fully Responsive:** Optimized for mobile, tablets, and desktops.

### 🔹 Backend (Node.js & Express.js)
- **Database:** MongoDB with Mongoose for efficient document-based storage.
- **Authentication & Security:** JWT for session management and protected API routes.
- **Image Uploading:** Blogs support image uploads, stored in `/uploads/blogsImg`.
- **Middleware:** Custom middleware to check authentication for users & admins.
- **Admin Panel:** Admins can manage users, including blocking/unblocking accounts.

## 📂 Folder Structure

### 📌 Frontend (`blogify-frontend`)
```bash
blogify-frontend/
│── public/
│   ├── images/ (Static assets, including logo)
│── src/
│   ├── actions/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   ├── users/ (Admin user management)
│   │   │   ├── login/ (Admin login page)
│   │   │   ├── signup/ (Admin signup page)
│   │   ├── blog/
│   │   │   ├── page.jsx (Display all blogs)
│   │   │   ├── [id]/ (View individual blogs)
│   │   ├── user/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── dashboard/
│   │   │   │   ├── createblog/ (Create new blog page)
│   │   │   │   ├── listblog/ (List all user-created blogs)
│   │   │   ├── editblog/[id]/ (Edit a specific blog)
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── store/
│   │   ├── adminStore.js
│   │   ├── userStore.js
│   ├── middleware.js
│── package.json
│── package-lock.json
│── README.md
```

### 📌 Backend (`blogify-backend`)
```bash
blogify-backend/
│── controllers/
│   ├── adminController.js
│   ├── userController.js
│   ├── blogController.js
│   ├── likeController.js
│── databaseConnection/
│   ├── config/db.js (MongoDB Connection)
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Blog.js
│   │   ├── Like.js
│   │   ├── User.js
│── middleware/
│   ├── authAdminMiddleware.js
│   ├── authUserMiddleware.js
│── routes/
│   ├── adminRoutes.js
│   ├── userRoutes.js
│   ├── blogRoutes.js
│   ├── likeRoutes.js
│── uploads/blogsImg/ (Stored images from blogs)
│── index.js
│── package.json
│── package-lock.json
│── README.md
```

## 📜 API Endpoints
### 🔹 Admin API
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/admin/users` | Fetch all users |
| PATCH | `/admin/set-block-status/${userId}` | Block/unblock a user |
| GET | `/admin/details` | Get information of logged-in admin |
| POST | `/admin/logout` | Logout admin |
| POST | `/admin` | Register a new admin |
| POST | `/admin/login` | Admin login |

### 🔹 User API
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/user/details` | Fetch details of the currently logged-in user |
| POST | `/user/logout` | Log out the user |
| POST | `/blog` | Upload new blog |
| GET | `/blog` | Fetch all blogs |
| GET | `/blog/user` | Fetch all blogs created by the logged-in user |
| DELETE | `/blog/deleteblog/${id}` | Delete a blog by its ID |
| GET | `/blog/${id}` | Fetch a single blog by its ID |
| PUT | `/blog/${id}` | Edit a blog by its ID |
| POST | `/user` | Register a new user |
| POST | `/user/login` | User login |

## 🌍 Live Website  
🚀 **Visit the live Blogify app here:**  
🔗 [https://blogify-frontend-three.vercel.app](https://blogify-frontend-three.vercel.app)

## 📸 Project Demo (Video)
<a href="https://youtu.be/51_I9xqr86w" target="_blank">
  <img src="https://img.youtube.com/vi/51_I9xqr86w/maxresdefault.jpg" alt="Watch the video" width="500" />
</a>

## 📸 Screenshots
<table>
  <tr>
    <th>🔐 Login Page (Mobile View)</th>
    <th>📱 Homepage (Mobile View)</th>
    <th>📖 Blog Page (Mobile View)</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img alt="Login Page (Mobile View)" src="https://github.com/user-attachments/assets/34adbc81-71b3-42eb-ad65-0e94b652a658" width="250" />
    </td>
    <td align="center" valign="top">
      <img alt="Homepage (Mobile View)" src="https://github.com/user-attachments/assets/e1cd2a03-2ffb-4fa6-920d-9ffe4a0b5900" width="250" />
    </td>
    <td align="center" valign="top">
      <img alt="Blog Page (Mobile View)" src="https://github.com/user-attachments/assets/39dec42b-da79-4a54-9bb8-c97f373844ec" width="250" />
    </td>
  </tr>
</table>

### 🧾 SideBar
<img alt="SideBar" src="https://github.com/user-attachments/assets/43db5e28-c5ad-41d9-8aeb-c24c5bacb0a1" width="300" />

### 🔐 Login Page (Desktop View)
![Login Page (Desktop View)](https://github.com/user-attachments/assets/45e61839-d759-4173-945f-32ff8f1f6d8f)

### 🏠 Homepage (Desktop View)
![Homepage (Desktop View)](https://github.com/user-attachments/assets/061a5083-ab71-4e35-852d-76c5abf8154f)

### 📝 All Blogs Dashboard (Desktop View)
![All Blogs Dashboard (Desktop View)](https://github.com/user-attachments/assets/4673efcc-b860-4235-abda-c99ecc5944aa)

### 📖 Blog Page (Desktop View)
![Blog Page (Desktop View)](https://github.com/user-attachments/assets/395569f5-51d7-4c30-83ec-c9afff2d0d6a)

## 📬 Contact
👨‍💻 Created by **Siddhesh Suresh Pagar**
- 📞 **Mobile:** +91 7021031478
- 📧 **Email:** pagarsiddhesh2000@gmail.com
- 🔗 **LinkedIn:** [Siddhesh Pagar](https://www.linkedin.com/in/siddheshpagar/)
- 📷 **Instagram:** [@iam__er_siiddh](https://www.instagram.com/iam__er_siiddh)

## ⭐ Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request.

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

## 🧑‍💻 About the Developer
My name is **Siddhesh Suresh Pagar**. I have successfully completed **PG-DAC (Post Graduation Diploma in Advanced Computing)** from **CDAC** in 2024, securing an **'A' grade with 75.13%**. I specialize in **MERN stack development and Next.js**, with a strong interest in **full-stack development**, backend architecture, and scalable web applications. I am constantly exploring new technologies to enhance my skill set and build efficient digital solutions.