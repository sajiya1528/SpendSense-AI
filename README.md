# SpendSense AI – Frontend

AI Powered Personal Expense Tracker – React frontend only (no backend).

## Tech Stack

- React.js (Vite)
- React Router DOM
- Bootstrap 5
- Axios (API service structure)
- React Icons
- Recharts
- React Hook Form
- React Toastify

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Demo Login

Use any email and password (min 6 characters) to sign in. Authentication uses mock local storage.

## Environment Variables

Create a `.env` file to configure the API base URL when connecting a backend:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Project Structure

```
src/
├── assets/
├── components/     # Reusable UI components
├── pages/          # Route pages
├── layouts/        # Auth & Main layouts
├── hooks/          # Custom React hooks
├── services/       # Axios API services
├── utils/          # Constants, formatters, dummy data
├── context/        # Auth context
└── styles/         # Theme CSS
```

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Production build
- `npm run preview` – Preview production build

## Backend Integration

API services are ready in `src/services/`. Replace mock auth in `AuthContext` and connect pages to real endpoints when the backend is available.
