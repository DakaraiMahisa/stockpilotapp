# SME Inventory and Sales Management Frontend

A modern single-page frontend for the SME Inventory and Sales Management platform. This app handles authentication, organization profile management, user administration, and the authenticated dashboard experience for the backend-powered system.

## Overview

Built with a clean React + TypeScript stack, the frontend is designed to work with a secure backend API using bearer authentication, cookie-based sessions, and CSRF protection.

## Highlights

- 🔐 Authentication flows for login, registration, email verification, password recovery, and invitation acceptance.
- 🛡️ Protected routing for authenticated areas of the app.
- 📊 Dashboard overview for sales, inventory, customers, and alerts.
- 🏢 Organization profile management with logo upload and business information editing.
- 👥 User management screens with permission-based access control.
- ⚡ Fast development experience powered by Vite, React Query, and TypeScript.
- 🎨 Tailwind-based UI with reusable layout and form components.

## Tech Stack

- ⚛️ React 19
- 🟦 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧠 TanStack React Query
- 🔁 React Router DOM
- 📡 Axios
- 🧩 React Hook Form + Zod
- 🌈 Lucide React icons
- 🍞 Sonner notifications
- 🧰 Zustand for auth state

## Key Modules

- 🔑 Identity and authentication
  - Login, register, forgot password, reset password, verify email, and invitation acceptance.
- 📁 Dashboard
  - Protected landing area for signed-in users.
- 🏢 Organization
  - View and update organization profile details, branding, address, tax information, and logo.
- 👤 Users
  - Browse users, view user details, and manage access for users with the required permissions.
- 🧱 Shared UI
  - App layout, topbar, sidebar, cards, inputs, tables, buttons, skeletons, empty states, and toaster notifications.

## Prerequisites

- 🟢 Node.js 20 or later
- 📦 npm, pnpm, or yarn
- 🌐 A running SME backend API instance

## Environment Variables

Create a `.env` file in the project root and configure the backend URL:

```env
VITE_API_BASE_URL=https://your-backend-api-url
```

The app uses this value for all API requests.

## Getting Started

1. 📥 Install dependencies.

```bash
npm install
```

2. ▶️ Start the development server.

```bash
npm run dev
```

3. 🌍 Open the app in your browser.

```bash
http://localhost:5173
```

## Available Scripts

- 🧪 `npm run dev` - Start the Vite development server.
- 🏗️ `npm run build` - Type-check and build the production bundle.
- 🧹 `npm run lint` - Run ESLint across the project.
- 👀 `npm run preview` - Preview the production build locally.

## Backend Integration

- 🔐 Requests are sent with credentials enabled.
- 🪪 Access tokens are attached as bearer tokens when available.
- 🧷 CSRF protection is initialized before the app renders.
- 🔄 If a session expires, the app clears auth state and redirects to login.
- 🧭 Permission checks control access to routes such as user management.

## Project Structure

- 📁 `src/routes` - App routing and route composition.
- 📁 `src/modules/identity` - Authentication, users, roles, and related pages.
- 📁 `src/modules/org` - Organization profile features.
- 📁 `src/components` - Shared layout and UI components.
- 📁 `src/lib` - API client, CSRF initialization, utilities, and notifications.
- 📁 `src/store` - Client-side auth state.
- 📁 `src/styles` - Global theme and styling.

## Notes

- 🧭 The app is intended to be used alongside the SME backend project.
- 🧩 The UI is built around reusable modules and route guards, making it straightforward to expand with inventory and sales workflows.
- 🌍 Country selection data is generated from the included country utility script.

## License

This project inherits the licensing terms of the parent SME project, if applicable.
