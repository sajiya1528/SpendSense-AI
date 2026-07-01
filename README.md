<div align="center">

# 💰 SpendSense AI
### AI Powered Personal Expense Tracker

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk)](https://openjdk.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A full-stack AI-powered personal finance management application. Track your income and expenses, visualize financial data, generate reports, and get AI-driven budget insights.

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#1-database-setup)
  - [Backend Setup](#2-backend-setup-spring-boot)
  - [Frontend Setup](#3-frontend-setup-react--vite)
- [Frontend Details](#-frontend-details)
- [Backend Details](#-backend-details)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Environment Variables](#-environment-variables)
- [Default Login Credentials](#-default-login-credentials)

---

## 🌟 Project Overview

SpendSense AI is a complete full-stack financial tracker featuring:

- 🔐 **Secure JWT Authentication** – Register, log in, and manage account securely
- 💸 **Expense & Income Tracking** – Log, edit, filter, and delete transactions
- 📊 **Analytics Dashboard** – Visual charts, category breakdowns, and monthly summaries
- 📄 **Report Generation** – Download statements as PDF, Excel, or CSV
- 🤖 **AI Insights** – Smart financial advice, auto-categorization, and budget recommendations
- 📱 **Responsive UI** – Works across all screen sizes

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 8.x | Build tool & dev server |
| React Router DOM | 7.x | Client-side routing |
| Axios | 1.x | HTTP API client |
| Bootstrap | 5.x | CSS component framework |
| Recharts | 3.x | Data visualization charts |
| React Hook Form | 7.x | Form handling & validation |
| React Toastify | 11.x | Toast notifications |
| React Icons | 5.x | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Core language |
| Spring Boot | 3.2.x | Application framework |
| Spring Security | 6.x | Authentication & authorization |
| Spring Data JPA | 3.x | Database ORM |
| MySQL Connector | 8.x | Database driver |
| JWT (jjwt) | 0.11.x | Stateless token authentication |
| Lombok | Latest | Boilerplate code reduction |
| OpenPDF | 1.3.x | PDF report generation |
| Apache POI | 5.2.x | Excel report generation |
| Springdoc OpenAPI | 2.5.x | Swagger API documentation |
| Maven | 3.x | Build & dependency management |

---

## 📁 Project Structure

```
SpendSense-AI/
│
├── 📂 backend/                          # Spring Boot Backend
│   ├── db/
│   │   ├── schema.sql                   # MySQL database schema
│   │   └── sample_data.sql              # Seed data for testing
│   ├── pom.xml                          # Maven dependencies
│   ├── README.md                        # Backend-specific readme
│   └── src/main/java/com/spendsenseai/
│       ├── SpendSenseApplication.java   # Entry point
│       ├── config/                      # Security & Swagger config
│       ├── controller/                  # REST API controllers
│       ├── dto/                         # Data Transfer Objects
│       ├── entity/                      # JPA entity models
│       ├── exception/                   # Custom exceptions & handler
│       ├── mapper/                      # Entity ↔ DTO mappers
│       ├── repository/                  # Spring Data JPA repositories
│       ├── security/                    # JWT utils & security filters
│       └── service/                     # Business logic layer
│
├── 📂 src/                              # React Frontend
│   ├── assets/                          # Images, logos, icons
│   ├── components/                      # Reusable UI components
│   │   └── charts/                      # Recharts chart components
│   ├── context/                         # Auth context (global state)
│   ├── hooks/                           # Custom React hooks
│   ├── layouts/                         # AuthLayout & MainLayout
│   ├── pages/                           # Route page components
│   ├── services/                        # Axios API service modules
│   ├── styles/                          # Global theme CSS
│   └── utils/                           # Constants, formatters, helpers
│
├── index.html                           # Vite HTML entry point
├── vite.config.js                       # Vite configuration
├── package.json                         # Node dependencies & scripts
├── .gitignore                           # Git ignore rules
└── README.md                            # This file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed on your machine:

| Tool | Version | Download |
|---|---|---|
| Node.js | 18.x or above | https://nodejs.org |
| Java JDK | 17 or above | https://openjdk.org |
| Apache Maven | 3.6+ | https://maven.apache.org |
| MySQL Server | 8.x | https://dev.mysql.com |
| Git | Any | https://git-scm.com |

---

### 1. Database Setup

> ⚠️ Ensure MySQL Server is running locally.

Open your MySQL client (MySQL Workbench, CLI, or DBeaver) and execute the SQL files in order:

**Step 1: Create tables**
```sql
-- Run this file to create the database and tables
SOURCE backend/db/schema.sql;
```

**Step 2: Load sample data**
```sql
-- Run this file to insert test users and transactions
SOURCE backend/db/sample_data.sql;
```

Or run via command line:
```bash
mysql -u root -p < backend/db/schema.sql
mysql -u root -p < backend/db/sample_data.sql
```

> **Note:** Update the MySQL username/password in `backend/src/main/resources/application.properties` if needed.

---

### 2. Backend Setup (Spring Boot)

Open a terminal in the **`backend/`** folder:

```bash
# Navigate to backend directory
cd backend

# Run the Spring Boot application
mvn spring-boot:run
```

✅ The backend is ready when you see:
```
Started SpendSenseApplication in X.XXX seconds
```

**Backend URLs:**
- API Base: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- API Docs: `http://localhost:8080/api-docs`

> 💡 **Alternative:** Import the `backend/` folder in **IntelliJ IDEA** and click the ▶ Run button on `SpendSenseApplication.java`.

---

### 3. Frontend Setup (React + Vite)

Open a **new, separate terminal** in the **root project folder** (`SpendSense-AI/`):

```bash
# Install all Node.js dependencies
npm install

# Start the Vite development server
npm run dev
```

✅ The frontend is ready when you see:
```
  VITE ready in XXXms
  ➜  Local: http://localhost:5173/
```

Open **http://localhost:5173** in your browser.

---

## 🎨 Frontend Details

### Available Scripts

```bash
npm run dev        # Start development server at localhost:5173
npm run build      # Build for production (outputs to /dist)
npm run preview    # Preview the production build
npm run lint       # Run the linter
```

### Key Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/login` | Login | Sign in with email & password |
| `/register` | Register | Create a new account |
| `/dashboard` | Dashboard | Financial overview & charts |
| `/expenses` | Expenses | Manage expense transactions |
| `/income` | Income | Manage income records |
| `/transactions` | Transactions | Combined transaction history |
| `/reports` | Reports | Download PDF / Excel / CSV |
| `/ai-insights` | AI Insights | AI financial advice |
| `/profile` | Profile | Update account details |
| `/settings` | Settings | App preferences |

### API Service Modules (in `src/services/`)

| File | Purpose |
|---|---|
| `api.js` | Axios instance with JWT interceptor |
| `authService.js` | Login, register endpoints |
| `expenseService.js` | Expense CRUD operations |
| `incomeService.js` | Income CRUD operations |
| `transactionService.js` | Combined transactions feed |
| `reportService.js` | PDF, Excel, CSV downloads |
| `aiService.js` | AI analysis & categorization |

---

## ⚙️ Backend Details

### Architecture

```
Request → Controller → Service → Repository → MySQL
                ↕
           DTO / Mapper
```

### Security Flow

1. User logs in via `POST /api/auth/login`
2. Backend validates credentials and returns a **JWT token**
3. Frontend stores the token in `localStorage`
4. Every subsequent API request includes `Authorization: Bearer <token>` header
5. `AuthTokenFilter` validates the token on each request

### Key Configuration (`application.properties`)

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/spendsense_db
spring.datasource.username=root
spring.datasource.password=root
spendsense.app.jwtExpirationMs=86400000    # Token valid for 24 hours
```

---

## 📡 API Endpoints Reference

### 🔐 Authentication – `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### 👤 User Profile – `/api/users`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/profile` | Get current user profile |
| PUT | `/api/users/profile` | Update name, phone, avatar |
| PUT | `/api/users/change-password` | Change account password |
| DELETE | `/api/users/delete` | Delete user account |

### 💸 Expenses – `/api/expenses`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/expenses` | Log a new expense |
| GET | `/api/expenses` | Get all expenses (supports `?category=`, `?startDate=`, `?endDate=`, `?query=`) |
| GET | `/api/expenses/{id}` | Get a specific expense |
| PUT | `/api/expenses/{id}` | Update an expense |
| DELETE | `/api/expenses/{id}` | Delete an expense |

### 💰 Income – `/api/income`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/income` | Log a new income |
| GET | `/api/income` | Get all income (supports `?query=`) |
| PUT | `/api/income/{id}` | Update an income |
| DELETE | `/api/income/{id}` | Delete an income |

### 📊 Dashboard – `/api/dashboard`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Get balance, monthly totals, category summaries, recent transactions |

### 📄 Reports – `/api/reports`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reports/pdf` | Download PDF financial statement |
| GET | `/api/reports/excel` | Download Excel workbook |
| GET | `/api/reports/csv` | Download CSV transaction log |

### 🤖 AI Insights – `/api/ai`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/analyze` | Analyze financial profile |
| POST | `/api/ai/categorize` | Auto-categorize an expense description |
| POST | `/api/ai/budget` | Get budget recommendations |
| POST | `/api/ai/summary` | Get a verbal financial summary |

---

## 🔧 Environment Variables

Create a `.env` file in the **root project directory** to configure the frontend:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

> If no `.env` is provided, the frontend defaults to `http://localhost:8080/api` automatically.

---

## 🔑 Default Login Credentials

After running `sample_data.sql`, use these demo accounts:

| Role | Email | Password |
|---|---|---|
| 👤 User | `john.doe@spendsense.com` | `password123` |
| 🛡️ Admin | `admin@spendsense.com` | `admin123` |

---

## 📬 API Testing

A **Postman Collection** is included at:
```
backend/SpendSenseAI_Postman_Collection.json
```

**To use it:**
1. Open Postman → Import the collection file
2. Call `POST /api/auth/login` — the token is **automatically saved** as a collection variable
3. All other requests use `{{token}}` automatically

---

<div align="center">

Built with ❤️ by **Sajiya Nazir**

⭐ Star this repo if you found it helpful!

</div>
