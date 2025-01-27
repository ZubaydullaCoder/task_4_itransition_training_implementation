# User Management System

A modern web application built with Next.js, MongoDB, and NextAuth for user management and authentication.

---

## 🚀 Live Demo

Check out the live demo: [https://task-4-itransition-training-implementation.vercel.app](https://task-4-itransition-training-implementation.vercel.app)

---

## ✨ Features

- 🔐 **User Authentication** (Login/Register)
- 👥 **User Management Dashboard**
- 📊 **Sortable User Table**
- ✅ **Multiple User Selection**
- 🔒 **Block/Unblock Users**
- 🗑️ **Delete Users**
- 🌓 **Dark/Light Theme**
- 📱 **Responsive Design**

---

## 🛠️ Built With

- [**Next.js 14**](https://nextjs.org/) - React Framework
- [**MongoDB**](https://www.mongodb.com/) - Database
- [**NextAuth.js**](https://next-auth.js.org/) - Authentication
- [**React Query**](https://tanstack.com/query/latest) - Server State Management
- [**Shadcn/ui**](https://ui.shadcn.com/) - UI Components
- [**Tailwind CSS**](https://tailwindcss.com/) - Styling
- [**React Hook Form**](https://react-hook-form.com/) - Form Management
- [**Zod**](https://zod.dev/) - Schema Validation

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **MongoDB database**
- **npm** or **yarn**

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/user-management-system.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Project Structure

```
├── app/
│   ├── (admin)/        # Admin routes
│   ├── (auth)/         # Auth routes
│   ├── api/            # API routes
│   └── layout.tsx      # Root layout
├── components/         # React components
├── lib/                # Utility functions
├── models/             # Database models
├── providers/          # Context providers
└── hooks/              # Custom hooks
```

---

## 🔒 Security Features

- **Password hashing** with bcrypt
- **MongoDB unique email constraint**
- **Protected API routes**
- **Session management**
- **Auto logout on account block**

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit pull requests.

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Zubaydulla Okhunboboyev**
