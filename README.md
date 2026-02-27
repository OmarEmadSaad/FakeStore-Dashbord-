# 🛍️ E-Commerce React App

A modern E-Commerce web application built with React, Redux Toolkit, TypeScript, and Tailwind CSS.

**Live Demo:** [https://fake-store-dashbord.vercel.app/](https://fake-store-dashbord.vercel.app/)  
**GitHub Repository:** [https://github.com/OmarEmadSaad/FakeStore-Dashbord-.git](https://github.com/OmarEmadSaad/FakeStore-Dashbord-.git)

---

## 🚀 Features

### 🔐 Authentication

- Login & Sign Up functionality
- Authentication state managed with Redux Toolkit
- Prevent adding products to cart without login
- SweetAlert2 alerts for authentication actions

### 🛒 Products

- Fetch products from API
- View product details
- Add products to cart
- Create new product page with validation

### 🧺 Cart

- Add / Remove products
- Increase & Decrease quantity using + / - buttons
- Smooth animation when removing items
- Total price displayed below the table (centered)

### ➕ Create Product Page

- Fields:
  - Title
  - Description
  - Price (positive numbers only)
  - Category (fetched from `/products/categories`)
  - Image URL
- Full validation
- Loading & error handling
- Disabled submit button during submission
- Success message after creation

---

## 🛠️ Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Material Tailwind
- SweetAlert2

---

## 📂 Project Structure

# 🛍️ E-Commerce React App

A modern E-Commerce web application built with React, Redux Toolkit, TypeScript, and Tailwind CSS.

**Live Demo:** [https://fake-store-dashbord.vercel.app/](https://fake-store-dashbord.vercel.app/)  
**GitHub Repository:** [https://github.com/OmarEmadSaad/FakeStore-Dashbord-.git](https://github.com/OmarEmadSaad/FakeStore-Dashbord-.git)

---

## 🚀 Features

### 🔐 Authentication

- Login & Sign Up functionality
- Authentication state managed with Redux Toolkit
- Prevent adding products to cart without login
- SweetAlert2 alerts for authentication actions

### 🛒 Products

- Fetch products from API
- View product details
- Add products to cart
- Create new product page with validation

### 🧺 Cart

- Add / Remove products
- Increase & Decrease quantity using + / - buttons
- Smooth animation when removing items
- Total price displayed below the table (centered)

### ➕ Create Product Page

- Fields:
  - Title
  - Description
  - Price (positive numbers only)
  - Category (fetched from `/products/categories`)
  - Image URL
- Full validation
- Loading & error handling
- Disabled submit button during submission
- Success message after creation

---

## 🛠️ Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Material Tailwind
- SweetAlert2

---

## 📂 Project Structure

FakeStore-Dashbord/
├── public/
│ └── assets/
├── src/
│ ├── components/
│ │ ├── admin/
│ │ │ ├── AdminLayout.tsx
│ │ │ ├── Dashboard.tsx
│ │ │ └── ProtectedAdminRoute.tsx
│ │ ├── auth/
│ │ │ ├── Login.tsx
│ │ │ └── SignUp.tsx
│ │ ├── common/
│ │ │ ├── Loader.tsx
│ │ │ ├── Pagination.tsx
│ │ │ └── RequestError.tsx
│ │ ├── layout/
│ │ │ └── Header.tsx
│ │ └── page/
│ │ └── SearchPage.tsx
│ ├── redux/
│ │ ├── authSlice.ts
│ │ ├── productSlice.ts
│ │ └── store.ts
│ ├── App.tsx
│ ├── index.css
│ ├── main.tsx
│ └── NotFound.tsx
├── .gitignore
├── db.json
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md

---

Products
GET /products - Fetch all products
GET /products/:id - Fetch single product details
POST /products - Create a new product (Admin only)
GET /products/categories - Fetch product categories

Users
GET /users - Fetch all users
POST /users - Create a new user

Cart
Local cart management via Redux Toolkit (linked to logged-in user)

---

## 📦 Installation

```bash
git clone https://github.com/OmarEmadSaad/FakeStore-Dashbord-.git
cd FakeStore-Dashbord
npm install
npm run dev
```
