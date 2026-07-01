# SpendSense AI - AI Powered Personal Expense Tracker Backend

SpendSense AI backend is built using **Java 17, Spring Boot 3, and MySQL**. It offers robust financial logging, custom report generation, an automated dashboard feed, security layers powered by JWT, and smart heuristic-based AI placeholders.

---

## Technical Stack

* **Language**: Java 17
* **Framework**: Spring Boot 3
* **Security**: Spring Security & JWT Authentication
* **ORM/JPA**: Spring Data JPA & Hibernate
* **Database**: MySQL 8.x
* **Build Tool**: Maven 3.x
* **Reporting**: OpenPDF (PDF output) & Apache POI (Excel output)
* **API Documentation**: Springdoc OpenAPI v3 (Swagger UI)

---

## Project Package Architecture

```
backend/
├── db/
│   ├── schema.sql
│   └── sample_data.sql
├── pom.xml
└── src/
    └── main/
        ├── java/com/spendsenseai/
        │   ├── SpendSenseApplication.java
        │   ├── config/          # CORS, Security, Swagger configurations
        │   ├── controller/      # REST API Controllers
        │   ├── dto/             # Data Transfer Objects
        │   ├── entity/          # JPA Hibernate Entity Models
        │   ├── exception/       # Exceptions & GlobalExceptionHandler
        │   ├── mapper/          # Entity DTO Mappers
        │   ├── repository/      # Spring Data JPA Repository Interfaces
        │   ├── security/        # JWT utilities and Security Filters
        │   └── service/         # Services & Implementations
        └── resources/
            └── application.properties
```

---

## Setup & Running Locally

### Step 1: Initialize Database
Ensure MySQL Server is running locally. Import the database schema and sample seed records:
```bash
mysql -u root -p < db/schema.sql
mysql -u root -p < db/sample_data.sql
```
*Note: Make sure your `root` password matches the setting in `application.properties`.*

### Step 2: Configure Properties
Review and modify settings in [application.properties](src/main/resources/application.properties):
* `spring.datasource.username` and `spring.datasource.password`
* `spendsense.app.jwtSecret` (change in production)

### Step 3: Run the Application
From the `backend/` directory, launch the Spring Boot dev server:
```bash
mvn spring-boot:run
```

---

## API Endpoints List

### 1. Authentication (`/api/auth`)
* `POST /api/auth/register` - Create user profile and generate token
* `POST /api/auth/login` - Verify user credentials and generate token

### 2. User Settings (`/api/users`)
* `GET /api/users/profile` - Fetch current user detail summary
* `PUT /api/users/profile` - Modify full name, phone number, or profile picture
* `PUT /api/users/change-password` - Verify and change account password
* `DELETE /api/users/delete` - Wipe out user account history

### 3. Expense Logs (`/api/expenses`)
* `POST /api/expenses` - Log a new expense
* `GET /api/expenses` - Fetch all expenses (supports search filters: `category`, `startDate` & `endDate` range, or `query` string title search)
* `GET /api/expenses/{id}` - Fetch single record details
* `PUT /api/expenses/{id}` - Edit logged expense
* `DELETE /api/expenses/{id}` - Remove expense record

### 4. Income Logs (`/api/income`)
* `POST /api/income` - Log a new income credit
* `GET /api/income` - Fetch income list (supports keyword filter `query`)
* `PUT /api/income/{id}` - Edit logged income
* `DELETE /api/income/{id}` - Remove income record

### 5. Consolidated Analytics (`/api/dashboard`)
* `GET /api/dashboard` - Fetch total balance, current month inflow/outflow, category percentages, and chronological recent transactions timeline

### 6. File Reports (`/api/reports`)
* `GET /api/reports/pdf` - Download PDF Financial Statement
* `GET /api/reports/excel` - Download multi-sheet Excel Workbook
* `GET /api/reports/csv` - Download raw transaction CSV log

### 7. AI Assistant (`/api/ai`)
* `POST /api/ai/analyze` - Dynamic assessment of savings health
* `POST /api/ai/categorize` - Classify an input prompt title into corresponding categories
* `POST /api/ai/budget` - Get targeted budgeting tips
* `POST /api/ai/summary` - Verbal financial status report

---

## API Testing & Swagger

Interactive API visualization is automatically exposed. Run the project and visit:
* **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
* **OpenAPI Specs**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

To test endpoints in Swagger or Postman:
1. Call `/api/auth/login` with `john.doe@spendsense.com` / `password123`.
2. Extract the `token` string.
3. Apply in the request headers: `Authorization: Bearer <token>`.
